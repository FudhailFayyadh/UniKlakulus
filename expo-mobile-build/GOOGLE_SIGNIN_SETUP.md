# Google Sign-In Setup Guide

## ✅ What's Been Done:

1. ✅ Installed required packages
2. ✅ Added Google Sign-In button to login screen
3. ✅ Implemented Google authentication logic
4. ✅ Updated app.json configuration

---

## 🔧 Required Steps to Complete Setup:

### Step 1: Get Web Client ID from Firebase Console

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select your **"unikalkulus"** project
3. Click **⚙️ Settings** (gear icon) → **Project settings**
4. Scroll down to **"Your apps"** section
5. Find the **Web app** (if you don't have one, create it)
6. Copy the **Web Client ID** (looks like: `123456789-abc123def456.apps.googleusercontent.com`)

### Step 2: Enable Google Sign-In in Firebase

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Click **Enable** toggle
4. Select a **support email** (your email)
5. Click **Save**

### Step 3: Update the Web Client ID in Code

Open `app/login.js` and replace this line (around line 35):

```javascript
webClientId: '456881922457-8qvj0g4h8q6j9q8q8q8q8q8q8q8q8q8q.apps.googleusercontent.com',
```

With your actual Web Client ID:

```javascript
webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID_HERE',
```

### Step 4: Download google-services.json (Android)

1. In Firebase Console → **Project settings**
2. Scroll to **Your apps** section
3. Click on your **Android app** (if you don't have one, add it with package name: `com.unikalkulus.app`)
4. Click **Download google-services.json**
5. Place the file in: `expo-mobile-build/google-services.json`

### Step 5: Configure SHA-1 Certificate (Android)

**For Development:**

1. Run this command to get your debug SHA-1:
   ```bash
   cd android
   .\gradlew signingReport
   ```

2. Copy the **SHA-1** from the output

3. In Firebase Console → **Project settings** → Your Android app → Click **Add fingerprint**

4. Paste the SHA-1 and save

**For Production:**

You'll need to generate a release keystore and add its SHA-1 fingerprint.

---

## 🧪 Testing Google Sign-In:

1. Rebuild the app:
   ```bash
   npx expo prebuild --clean
   npx expo run:android
   ```

2. Click the **"Lanjutkan dengan Google"** button

3. Select your Google account

4. Sign in successfully!

---

## 🎨 Features Added:

- ✅ Google Sign-In button with Google blue color (#4285F4)
- ✅ "G" icon styled like Google's branding
- ✅ Auto-creates user document in Firestore on first sign-in
- ✅ Handles errors gracefully
- ✅ Works alongside email/password authentication

---

## 📝 Notes:

- Google Sign-In requires **Google Play Services** on the device
- Won't work on emulators without Google Play
- For iOS, additional setup is required (GoogleService-Info.plist)
- The button appears on both login and register screens

---

## 🐛 Common Issues:

**Issue:** "Google Play Services not available"
- **Solution:** Use a real device or an emulator with Google Play Services

**Issue:** "Sign in failed"
- **Solution:** Make sure Web Client ID is correct and Google provider is enabled in Firebase

**Issue:** "Developer error"
- **Solution:** Add SHA-1 fingerprint to Firebase Console

---

## 🚀 Next Steps:

After completing the setup:
1. Test on a real Android device
2. Verify user data is saved in Firestore
3. Test profile screen shows Google photo
4. Test logout and re-login functionality

Good luck! 🎉
