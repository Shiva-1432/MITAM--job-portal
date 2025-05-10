-- Create database if not exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'jobportal')
BEGIN
    CREATE DATABASE jobportal;
END
GO

USE jobportal;
GO

-- Create schema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'jobportal')
BEGIN
    EXEC('CREATE SCHEMA jobportal');
END
GO

-- Create tables
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL,
        company VARCHAR(255),
        position VARCHAR(255),
        bio VARCHAR(MAX),
        profile_picture_url VARCHAR(255),
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'jobs')
BEGIN
    CREATE TABLE jobs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description VARCHAR(MAX) NOT NULL,
        requirements VARCHAR(MAX) NOT NULL,
        salary VARCHAR(100) NOT NULL,
        level VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        posted_date DATETIME2 DEFAULT GETDATE(),
        deadline_date DATETIME2 NOT NULL,
        is_active BIT DEFAULT 1,
        created_by BIGINT NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_skills')
BEGIN
    CREATE TABLE job_skills (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        job_id BIGINT NOT NULL,
        skill VARCHAR(100) NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_applications')
BEGIN
    CREATE TABLE job_applications (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        job_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        cover_letter VARCHAR(MAX),
        resume_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'PENDING',
        applied_date DATETIME2 DEFAULT GETDATE(),
        last_updated DATETIME2 DEFAULT GETDATE(),
        employer_notes VARCHAR(MAX),
        interview_date DATETIME2,
        interview_location VARCHAR(255),
        interview_notes VARCHAR(MAX),
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END
GO

-- Create indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_users_email')
BEGIN
    CREATE UNIQUE INDEX IX_users_email ON users(email);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_jobs_company')
BEGIN
    CREATE INDEX IX_jobs_company ON jobs(company);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_jobs_location')
BEGIN
    CREATE INDEX IX_jobs_location ON jobs(location);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_jobs_level')
BEGIN
    CREATE INDEX IX_jobs_level ON jobs(level);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_job_applications_status')
BEGIN
    CREATE INDEX IX_job_applications_status ON job_applications(status);
END
GO

-- Create maintenance tables
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

-- Create stored procedures
EXEC('CREATE OR ALTER PROCEDURE sp_MaintainDatabase AS BEGIN SET NOCOUNT ON; EXEC sp_updatestats; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_ArchiveOldApplications AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_CollectDatabaseMetrics AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_MonitorSlowQueries @ThresholdMs INT = 1000 AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_GetDatabaseHealthReport AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_GenerateJobMarketReport @StartDate DATE = NULL, @EndDate DATE = NULL AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_GenerateApplicationSuccessReport @StartDate DATE = NULL, @EndDate DATE = NULL AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_GenerateEmployerPerformanceReport @EmployerId BIGINT, @StartDate DATE = NULL, @EndDate DATE = NULL AS BEGIN SET NOCOUNT ON; END');
GO

EXEC('CREATE OR ALTER PROCEDURE sp_GenerateJobSeekerSuccessReport @JobSeekerId BIGINT, @StartDate DATE = NULL, @EndDate DATE = NULL AS BEGIN SET NOCOUNT ON; END');
GO

-- Create SQL Server Agent jobs
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

-- Create monitoring job
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