@echo off
echo Stopping Job Portal Application...

REM Stop Frontend
echo Stopping Frontend...
taskkill /FI "WINDOWTITLE eq Job Portal Frontend*" /F

REM Stop Backend
echo Stopping Backend...
taskkill /FI "WINDOWTITLE eq Job Portal Backend*" /F

REM Stop SQL Server (optional, uncomment if needed)
REM echo Stopping SQL Server...
REM net stop MSSQLSERVER

echo.
echo Job Portal Application has been stopped.
echo.
pause 