@echo off
echo ========================================
echo UniKalkulus Mobile - Quick Start
echo ========================================
echo.

cd /d "%~dp0"

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo.
    echo Installing dependencies...
    call npm install
    echo.
)

echo.
echo Starting Expo development server...
echo.
echo Once started, you can:
echo  - Scan QR code with Expo Go app on your phone
echo  - Press 'a' to open Android emulator
echo  - Press 'i' to open iOS simulator (Mac only)
echo  - Press 'w' to open in web browser
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call npm start
