# Firebase Firestore Security Rules

## Problem
You're getting "Missing or insufficient permissions" error when saving quiz results.

## Solution
You need to update your Firestore security rules in the Firebase Console.

### Steps to Fix:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: "unikalkulus"

2. **Navigate to Firestore Database**
   - Click "Firestore Database" in the left menu
   - Click "Rules" tab at the top

3. **Replace the rules with this:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. **Click "Publish" button**

### What This Does:
- ✅ Allows authenticated users to read their own user document
- ✅ Allows authenticated users to write/update their own user document (quiz results)
- ❌ Prevents users from accessing other users' data
- ❌ Denies all unauthenticated access

### Alternative (For Testing Only - NOT SECURE):
If you want to test quickly, you can use this (but it's NOT recommended for production):

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This allows any authenticated user to read/write all documents (less secure).

---

## After Updating Rules:

1. Save/Publish the rules in Firebase Console
2. Wait 10-30 seconds for changes to propagate
3. Restart your app and try the quiz again
4. Quiz results should now save successfully! ✅

## Testing:
1. Complete a quiz while logged in
2. Check your profile - quiz history should appear
3. No more "permissions" errors in console

---

**Note:** If you're still getting errors after updating rules, make sure you're logged in when taking the quiz. The app shows a "Login to save progress" prompt if you're not logged in.
