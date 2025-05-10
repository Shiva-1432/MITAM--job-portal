@echo off
echo Setting up Job Portal Database...

REM Set SQL Server connection details
set SERVER=localhost
set DATABASE=jobportal
set USERNAME=sa
set PASSWORD=YourStrongPassword123

REM Run the setup script
sqlcmd -S %SERVER% -U %USERNAME% -P %PASSWORD% -i src\main\resources\setup.sql

if %ERRORLEVEL% EQU 0 (
    echo Database setup completed successfully!
) else (
    echo Error setting up database. Please check the error messages above.
)

pause 