@echo off
title Cafe Demo - Launching...
echo.
echo  ========================================
echo    Cafe Demo - Opening in Browser...
echo  ========================================
echo.
echo  [OK] Launching index.html in your default browser...
echo.
echo  Link: %~dp0index.html
echo.
start "" "%~dp0index.html"
echo  [DONE] Cafe Demo is now open!
echo.
pause
