# UniKalkulus Mobile App

A Flutter mobile application for the UniKalkulus learning platform.

## Features

- ✨ **Splash Screen**: Beautiful loading screen with UniKalkulus branding
- 📱 **WebView Integration**: Loads the full web application inside the mobile app
- 🔐 **Firebase Authentication**: Supports Google Sign-in and Email/Password authentication
- 📚 **Educational Content**: Calculus learning materials for Limit, Derivative, and Integral
- 🧠 **Interactive Quiz**: Test your understanding with built-in quizzes

## Project Structure

```
lib/
  ├── main.dart                 # App entry point
  └── screens/
      ├── splash_screen.dart    # Splash screen with 3-second delay
      └── home_page.dart        # WebView container for the web app

assets/
  ├── image/
  │   └── UniKalkulus.jpg      # App logo for splash screen
  └── web/
      ├── index.html           # Main web application HTML
      ├── script.js            # JavaScript functionality
      ├── style.css            # Web app styling
      ├── firebase-integration.js  # Firebase configuration
      └── image.jpg            # Hero section image
```

## Setup Instructions

### Prerequisites

- Flutter SDK (>= 3.10.1)
- Android Studio / Xcode (for mobile development)
- An Android device or emulator / iOS simulator

### Installation

1. Navigate to the project directory:
   ```bash
   cd flutter-mobile-build/splash_screen_test
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

### Building for Release

#### Android APK
```bash
flutter build apk --release
```
The APK will be located at: `build/app/outputs/flutter-apk/app-release.apk`

#### Android App Bundle (for Google Play)
```bash
flutter build appbundle --release
```

#### iOS
```bash
flutter build ios --release
```

## Dependencies

- `webview_flutter: ^4.0.0` - WebView widget for Flutter
- `webview_flutter_android: ^3.0.0` - Android implementation
- `webview_flutter_wkwebview: ^3.0.0` - iOS implementation
- `flutter_launcher_icons: ^0.13.1` - Custom app icon generation

## How It Works

1. **App Launch**: The app starts with the splash screen showing the UniKalkulus logo
2. **Transition**: After 3 seconds, the splash screen transitions to the main page
3. **WebView Loading**: The home page loads the web application from assets using WebView
4. **Full Functionality**: Users can access all web features including:
   - Learning materials (Limit, Derivative, Integral)
   - Video tutorials
   - Interactive quizzes
   - Firebase authentication
   - Progress tracking

## Permissions

The app requires the following Android permissions:
- `INTERNET` - For loading web content and Firebase services
- `ACCESS_NETWORK_STATE` - For checking network connectivity

## Customization

### Change Splash Duration
Edit `lib/screens/splash_screen.dart`:
```dart
await Future.delayed(const Duration(seconds: 3)); // Change seconds here
```

### Update App Icon
Replace `assets/image/UniKalkulus.jpg` with your own logo and run:
```bash
flutter pub run flutter_launcher_icons
```

### Modify Web Content
Edit the files in `assets/web/` directory:
- `index.html` - HTML structure
- `script.js` - JavaScript functionality
- `style.css` - Styling
- `firebase-integration.js` - Firebase configuration

## Testing

Run on different devices to ensure compatibility:

```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device_id>
```

## Troubleshooting

### WebView not loading
- Ensure internet permissions are set in AndroidManifest.xml
- Check that all asset files are properly listed in pubspec.yaml

### Build errors
```bash
flutter clean
flutter pub get
flutter build apk
```

## License

© 2025 UniKalkulus. All rights reserved.

## Support

For issues or questions, please contact the development team.
