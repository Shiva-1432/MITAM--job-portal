-- Create backup directory if it doesn't exist
DECLARE @BackupPath NVARCHAR(500) = 'C:\Backups\JobPortal\';
DECLARE @BackupFileName NVARCHAR(500) = @BackupPath + 'JobPortal_' + CONVERT(NVARCHAR(20), GETDATE(), 112) + '_' + REPLACE(CONVERT(NVARCHAR(20), GETDATE(), 108), ':', '') + '.bak';

-- Create backup directory if it doesn't exist
EXEC xp_cmdshell 'IF NOT EXIST "C:\Backups\JobPortal" MKDIR "C:\Backups\JobPortal"';

-- Perform full backup
BACKUP DATABASE jobportal
TO DISK = @BackupFileName
WITH FORMAT,
    MEDIANAME = 'JobPortalBackup',
    NAME = 'Full Backup of JobPortal Database',
    COMPRESSION,
    STATS = 10;
GO

-- Create backup history table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'backup_history')
BEGIN
    CREATE TABLE backup_history (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        backup_file NVARCHAR(500) NOT NULL,
        backup_date DATETIME2 NOT NULL,
        backup_size BIGINT NOT NULL,
        backup_type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Insert backup record
INSERT INTO backup_history (backup_file, backup_date, backup_size, backup_type, status)
SELECT 
    @BackupFileName,
    GETDATE(),
    size,
    'FULL',
    'COMPLETED'
FROM sys.database_files
WHERE type = 0;
GO

-- Create stored procedure for automated backup
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_BackupJobPortal')
    DROP PROCEDURE sp_BackupJobPortal;
GO

CREATE PROCEDURE sp_BackupJobPortal
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @BackupPath NVARCHAR(500) = 'C:\Backups\JobPortal\';
    DECLARE @BackupFileName NVARCHAR(500) = @BackupPath + 'JobPortal_' + CONVERT(NVARCHAR(20), GETDATE(), 112) + '_' + REPLACE(CONVERT(NVARCHAR(20), GETDATE(), 108), ':', '') + '.bak';
    
    -- Create backup directory if it doesn't exist
    EXEC xp_cmdshell 'IF NOT EXIST "C:\Backups\JobPortal" MKDIR "C:\Backups\JobPortal"';
    
    -- Perform full backup
    BACKUP DATABASE jobportal
    TO DISK = @BackupFileName
    WITH FORMAT,
        MEDIANAME = 'JobPortalBackup',
        NAME = 'Full Backup of JobPortal Database',
        COMPRESSION,
        STATS = 10;
    
    -- Insert backup record
    INSERT INTO backup_history (backup_file, backup_date, backup_size, backup_type, status)
    SELECT 
        @BackupFileName,
        GETDATE(),
        size,
        'FULL',
        'COMPLETED'
    FROM sys.database_files
    WHERE type = 0;
    
    -- Clean up old backups (keep last 7 days)
    DECLARE @OldBackupDate DATE = DATEADD(day, -7, GETDATE());
    
    DELETE FROM backup_history
    WHERE backup_date < @OldBackupDate;
    
    -- Delete old backup files
    DECLARE @DeleteCommand NVARCHAR(1000);
    SET @DeleteCommand = 'FORFILES /P "' + @BackupPath + '" /S /M *.bak /D -7 /C "cmd /c del @path"';
    EXEC xp_cmdshell @DeleteCommand;
END
GO

-- Create SQL Server Agent job for automated backup
IF EXISTS (SELECT * FROM msdb.dbo.sysjobs WHERE name = 'JobPortal_DailyBackup')
    EXEC msdb.dbo.sp_delete_job @job_name = 'JobPortal_DailyBackup';
GO

EXEC msdb.dbo.sp_add_job
    @job_name = 'JobPortal_DailyBackup',
    @description = 'Daily backup of JobPortal database',
    @category_name = 'Database Maintenance',
    @owner_login_name = 'sa';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name = 'JobPortal_DailyBackup',
    @step_name = 'Perform Backup',
    @subsystem = 'TSQL',
    @command = 'EXEC sp_BackupJobPortal',
    @database_name = 'jobportal';
GO

EXEC msdb.dbo.sp_add_schedule
    @job_name = 'JobPortal_DailyBackup',
    @name = 'DailyBackupSchedule',
    @freq_type = 4, -- Daily
    @freq_interval = 1,
    @active_start_time = 010000; -- 1:00 AM
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name = 'JobPortal_DailyBackup',
    @schedule_name = 'DailyBackupSchedule';
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name = 'JobPortal_DailyBackup',
    @server_name = '(local)';
GO 