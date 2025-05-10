-- Create monitoring tables
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'database_metrics')
BEGIN
    CREATE TABLE database_metrics (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        metric_name VARCHAR(100) NOT NULL,
        metric_value DECIMAL(18,2) NOT NULL,
        metric_unit VARCHAR(50),
        collected_at DATETIME2 NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'performance_logs')
BEGIN
    CREATE TABLE performance_logs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        query_text VARCHAR(MAX),
        execution_time_ms INT,
        cpu_time_ms INT,
        logical_reads INT,
        physical_reads INT,
        executed_at DATETIME2 NOT NULL
    );
END
GO

-- Procedure to collect database metrics
CREATE OR ALTER PROCEDURE sp_CollectDatabaseMetrics
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @CurrentTime DATETIME2 = GETDATE();
    
    -- Database size
    INSERT INTO database_metrics (metric_name, metric_value, metric_unit, collected_at)
    SELECT 'Database Size (MB)', SUM(size/128.0), 'MB', @CurrentTime
    FROM sys.database_files;
    
    -- Free space
    INSERT INTO database_metrics (metric_name, metric_value, metric_unit, collected_at)
    SELECT 'Free Space (MB)', SUM(size/128.0 - FILEPROPERTY(name, 'SpaceUsed')/128.0), 'MB', @CurrentTime
    FROM sys.database_files
    WHERE type = 0;
    
    -- Active connections
    INSERT INTO database_metrics (metric_name, metric_value, metric_unit, collected_at)
    SELECT 'Active Connections', COUNT(*), 'Count', @CurrentTime
    FROM sys.dm_exec_sessions
    WHERE database_id = DB_ID();
    
    -- Buffer cache hit ratio
    INSERT INTO database_metrics (metric_name, metric_value, metric_unit, collected_at)
    SELECT 'Buffer Cache Hit Ratio', 
           (a.cntr_value * 1.0 / b.cntr_value) * 100.0,
           'Percentage',
           @CurrentTime
    FROM sys.dm_os_performance_counters a
    JOIN sys.dm_os_performance_counters b
    ON a.object_name = b.object_name
    WHERE a.counter_name = 'Buffer cache hit ratio'
    AND b.counter_name = 'Buffer cache hit ratio base';
    
    -- Page life expectancy
    INSERT INTO database_metrics (metric_name, metric_value, metric_unit, collected_at)
    SELECT 'Page Life Expectancy',
           cntr_value,
           'Seconds',
           @CurrentTime
    FROM sys.dm_os_performance_counters
    WHERE counter_name = 'Page life expectancy';
END
GO

-- Procedure to monitor slow queries
CREATE OR ALTER PROCEDURE sp_MonitorSlowQueries
    @ThresholdMs INT = 1000 -- Default threshold: 1 second
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get slow queries from the plan cache
    INSERT INTO performance_logs (query_text, execution_time_ms, cpu_time_ms, logical_reads, physical_reads, executed_at)
    SELECT 
        SUBSTRING(qt.text, (qs.statement_start_offset/2)+1,
            ((CASE qs.statement_end_offset
                WHEN -1 THEN DATALENGTH(qt.text)
                ELSE qs.statement_end_offset
            END - qs.statement_start_offset)/2) + 1) AS query_text,
        qs.total_elapsed_time/1000 AS execution_time_ms,
        qs.total_worker_time/1000 AS cpu_time_ms,
        qs.total_logical_reads AS logical_reads,
        qs.total_physical_reads AS physical_reads,
        GETDATE() AS executed_at
    FROM sys.dm_exec_query_stats qs
    CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
    WHERE qs.total_elapsed_time/1000 > @ThresholdMs
    AND qt.dbid = DB_ID();
END
GO

-- Procedure to get database health report
CREATE OR ALTER PROCEDURE sp_GetDatabaseHealthReport
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Collect current metrics
    EXEC sp_CollectDatabaseMetrics;
    
    -- Get latest metrics
    SELECT 
        metric_name,
        metric_value,
        metric_unit,
        collected_at
    FROM database_metrics
    WHERE collected_at >= DATEADD(hour, -1, GETDATE())
    ORDER BY collected_at DESC, metric_name;
    
    -- Get slow queries in the last hour
    SELECT 
        query_text,
        execution_time_ms,
        cpu_time_ms,
        logical_reads,
        physical_reads,
        executed_at
    FROM performance_logs
    WHERE executed_at >= DATEADD(hour, -1, GETDATE())
    ORDER BY execution_time_ms DESC;
    
    -- Get index fragmentation
    SELECT 
        OBJECT_NAME(ips.object_id) AS table_name,
        i.name AS index_name,
        ips.avg_fragmentation_in_percent
    FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) ips
    JOIN sys.indexes i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
    WHERE ips.avg_fragmentation_in_percent > 30
    ORDER BY ips.avg_fragmentation_in_percent DESC;
    
    -- Get maintenance log entries
    SELECT 
        operation,
        status,
        details,
        executed_at,
        duration_ms
    FROM maintenance_log
    WHERE executed_at >= DATEADD(day, -7, GETDATE())
    ORDER BY executed_at DESC;
END
GO

-- Create SQL Server Agent job for monitoring
IF EXISTS (SELECT * FROM msdb.dbo.sysjobs WHERE name = 'JobPortal_Monitoring')
    EXEC msdb.dbo.sp_delete_job @job_name = 'JobPortal_Monitoring';
GO

EXEC msdb.dbo.sp_add_job
    @job_name = 'JobPortal_Monitoring',
    @description = 'Database monitoring tasks',
    @category_name = 'Database Maintenance',
    @owner_login_name = 'sa';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name = 'JobPortal_Monitoring',
    @step_name = 'Collect Metrics',
    @subsystem = 'TSQL',
    @command = 'EXEC sp_CollectDatabaseMetrics; EXEC sp_MonitorSlowQueries;',
    @database_name = 'jobportal';
GO

EXEC msdb.dbo.sp_add_schedule
    @job_name = 'JobPortal_Monitoring',
    @name = 'MonitoringSchedule',
    @freq_type = 4, -- Daily
    @freq_interval = 1,
    @active_start_time = 000000; -- Every hour
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name = 'JobPortal_Monitoring',
    @schedule_name = 'MonitoringSchedule';
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name = 'JobPortal_Monitoring',
    @server_name = '(local)';
GO 