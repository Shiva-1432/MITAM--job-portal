-- Procedure to perform database maintenance tasks
CREATE OR ALTER PROCEDURE sp_MaintainDatabase
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Update statistics
    EXEC sp_updatestats;
    
    -- Rebuild indexes
    DECLARE @TableName NVARCHAR(255);
    DECLARE @SQL NVARCHAR(MAX);
    
    DECLARE TableCursor CURSOR FOR
    SELECT name FROM sys.tables WHERE type = 'U';
    
    OPEN TableCursor;
    FETCH NEXT FROM TableCursor INTO @TableName;
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @SQL = 'ALTER INDEX ALL ON ' + @TableName + ' REBUILD';
        EXEC sp_executesql @SQL;
        FETCH NEXT FROM TableCursor INTO @TableName;
    END
    
    CLOSE TableCursor;
    DEALLOCATE TableCursor;
    
    -- Shrink database if needed
    DECLARE @FreeSpaceMB DECIMAL(18,2);
    SELECT @FreeSpaceMB = SUM(size/128.0 - FILEPROPERTY(name, 'SpaceUsed')/128.0)
    FROM sys.database_files
    WHERE type = 0;
    
    IF @FreeSpaceMB > 1000 -- If more than 1GB free space
    BEGIN
        DBCC SHRINKDATABASE (jobportal, 10); -- Shrink to 10% free space
    END
    
    -- Clean up old data
    -- Archive old job applications
    EXEC sp_ArchiveOldApplications;
    
    -- Clean up expired jobs
    UPDATE jobs
    SET is_active = 0
    WHERE deadline_date < GETDATE()
    AND is_active = 1;
    
    -- Log maintenance completion
    INSERT INTO maintenance_log (operation, status, details, executed_at)
    VALUES ('Database Maintenance', 'Completed', 'Statistics updated, indexes rebuilt, database shrunk, old data cleaned', GETDATE());
END
GO

-- Procedure to archive old job applications
CREATE OR ALTER PROCEDURE sp_ArchiveOldApplications
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Create archive table if it doesn't exist
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_applications_archive')
    BEGIN
        CREATE TABLE job_applications_archive (
            id BIGINT,
            job_id BIGINT,
            user_id BIGINT,
            cover_letter VARCHAR(MAX),
            resume_url VARCHAR(255),
            status VARCHAR(50),
            applied_date DATETIME2,
            last_updated DATETIME2,
            employer_notes VARCHAR(MAX),
            interview_date DATETIME2,
            interview_location VARCHAR(255),
            interview_notes VARCHAR(MAX),
            archived_date DATETIME2 DEFAULT GETDATE()
        );
    END
    
    -- Archive applications older than 1 year
    INSERT INTO job_applications_archive
    SELECT 
        id, job_id, user_id, cover_letter, resume_url, status,
        applied_date, last_updated, employer_notes, interview_date,
        interview_location, interview_notes, GETDATE()
    FROM job_applications
    WHERE applied_date < DATEADD(year, -1, GETDATE());
    
    -- Delete archived applications
    DELETE FROM job_applications
    WHERE applied_date < DATEADD(year, -1, GETDATE());
    
    -- Log archiving operation
    INSERT INTO maintenance_log (operation, status, details, executed_at)
    VALUES ('Application Archiving', 'Completed', 'Archived applications older than 1 year', GETDATE());
END
GO

-- Create maintenance log table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'maintenance_log')
BEGIN
    CREATE TABLE maintenance_log (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        operation VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        details VARCHAR(MAX),
        executed_at DATETIME2 NOT NULL,
        duration_ms INT,
        error_message VARCHAR(MAX)
    );
END
GO

-- Create SQL Server Agent job for maintenance
IF EXISTS (SELECT * FROM msdb.dbo.sysjobs WHERE name = 'JobPortal_Maintenance')
    EXEC msdb.dbo.sp_delete_job @job_name = 'JobPortal_Maintenance';
GO

EXEC msdb.dbo.sp_add_job
    @job_name = 'JobPortal_Maintenance',
    @description = 'Weekly database maintenance tasks',
    @category_name = 'Database Maintenance',
    @owner_login_name = 'sa';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name = 'JobPortal_Maintenance',
    @step_name = 'Perform Maintenance',
    @subsystem = 'TSQL',
    @command = 'EXEC sp_MaintainDatabase',
    @database_name = 'jobportal';
GO

EXEC msdb.dbo.sp_add_schedule
    @job_name = 'JobPortal_Maintenance',
    @name = 'WeeklyMaintenanceSchedule',
    @freq_type = 8, -- Weekly
    @freq_interval = 1, -- Sunday
    @active_start_time = 020000; -- 2:00 AM
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name = 'JobPortal_Maintenance',
    @schedule_name = 'WeeklyMaintenanceSchedule';
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name = 'JobPortal_Maintenance',
    @server_name = '(local)';
GO 