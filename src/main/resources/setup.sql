-- Run initialization script
:r init.sql
GO

-- Run maintenance procedures
:r maintenance.sql
GO

-- Run monitoring procedures
:r monitoring.sql
GO

-- Run reporting procedures
:r reports.sql
GO

-- Run sample data
:r data.sql
GO

-- Verify setup
SELECT 'Database setup completed successfully' AS Status;
GO

-- List all created objects
SELECT 'Tables' AS ObjectType, name AS ObjectName
FROM sys.tables
WHERE type = 'U'
UNION ALL
SELECT 'Stored Procedures' AS ObjectType, name AS ObjectName
FROM sys.procedures
UNION ALL
SELECT 'Indexes' AS ObjectType, name AS ObjectName
FROM sys.indexes
WHERE object_id IN (SELECT object_id FROM sys.tables)
UNION ALL
SELECT 'SQL Server Agent Jobs' AS ObjectType, name AS ObjectName
FROM msdb.dbo.sysjobs
WHERE name LIKE 'JobPortal_%'
ORDER BY ObjectType, ObjectName;
GO 