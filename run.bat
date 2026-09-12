@echo off
title Cafe Demo - Local Server
echo.
echo  ========================================
echo    Cafe Demo - Starting Local Server...
echo  ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo  [OK] Python found! Starting server on http://localhost:8000
    echo  [INFO] Press CTRL+C to stop the server.
    echo.
    start "" http://localhost:8000
    python -m http.server 8000
) ELSE (
    REM Try python3
    python3 --version >nul 2>&1
    IF %ERRORLEVEL% EQU 0 (
        echo  [OK] Python3 found! Starting server on http://localhost:8000
        echo  [INFO] Press CTRL+C to stop the server.
        echo.
        start "" http://localhost:8000
        python3 -m http.server 8000
    ) ELSE (
        echo  [WARN] Python not found. Opening index.html directly in browser...
        echo.
        start "" "%~dp0index.html"
    )
)

pause
