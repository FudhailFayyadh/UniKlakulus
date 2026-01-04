@echo off
echo ================================
echo UniKalkulus Expo Setup
echo ================================
echo.

echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [3/3] Setup complete!
echo.
echo ================================
echo Next Steps:
echo ================================
echo 1. Add image assets to the 'assets' folder
echo    (See assets/README.md for details)
echo.
echo 2. Start the development server:
echo    npm start
echo.
echo 3. Run on your device:
echo    - Install "Expo Go" app
echo    - Scan QR code
echo.
echo Or run on emulator:
echo    - Press 'a' for Android
echo    - Press 'i' for iOS (macOS only)
echo.
echo ================================
echo.
pause
