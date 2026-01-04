#!/bin/bash

echo "================================"
echo "UniKalkulus Expo Setup"
echo "================================"
echo ""

echo "[1/3] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js is installed"
echo ""

echo "[2/3] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

echo "[3/3] Setup complete!"
echo ""
echo "================================"
echo "Next Steps:"
echo "================================"
echo "1. Add image assets to the 'assets' folder"
echo "   (See assets/README.md for details)"
echo ""
echo "2. Start the development server:"
echo "   npm start"
echo ""
echo "3. Run on your device:"
echo "   - Install 'Expo Go' app"
echo "   - Scan QR code"
echo ""
echo "Or run on emulator:"
echo "   - Press 'a' for Android"
echo "   - Press 'i' for iOS (macOS only)"
echo ""
echo "================================"
echo ""
