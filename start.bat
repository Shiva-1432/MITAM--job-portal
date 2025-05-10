@echo off
echo Starting Job Portal Application...

REM Start SQL Server (if not running)
echo Checking SQL Server status...
sqlcmd -S localhost -U sa -P YourStrongPassword123 -Q "SELECT @@VERSION" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Starting SQL Server...
    net start MSSQLSERVER
    timeout /t 10 /nobreak
)

REM Setup database if not exists
echo Setting up database...
call backend\setup.bat

REM Start Backend
echo Starting Spring Boot Backend...
start "Job Portal Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 30 /nobreak

REM Start Frontend
echo Starting React Frontend...
start "Job Portal Frontend" cmd /k "cd frontend && npm start"

echo.
echo Job Portal Application is starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop the respective service
echo. 