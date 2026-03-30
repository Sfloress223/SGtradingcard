@echo off
echo.
echo  =========================================
echo    S&G Trading Card - Starting Servers
echo  =========================================
echo.
echo  Starting payment server (port 3001)...
start "S&G Backend" cmd /c "cd /d %~dp0 && node server.js"
timeout /t 2 >nul
echo  Starting website (port 5173)...
start "S&G Frontend" cmd /c "cd /d %~dp0 && npx vite"
echo.
echo  =========================================
echo   Both servers are starting!
echo.
echo   Website:  http://localhost:5173
echo   Admin:    http://localhost:5173/#admin
echo   API:      http://localhost:3001
echo  =========================================
echo.
echo  Close this window when you're done.
pause
