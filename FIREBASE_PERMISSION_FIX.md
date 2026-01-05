# Firebase Firestore Permission Fix Guide

## Issue Description
The UniKalkulus mobile app is showing this error when users try to save quiz results:

```
ERROR: Missing or insufficient permissions
Error code: permission-denied
```

This happens because the Firestore security rules haven't been configured to allow users to save their quiz results.

---

## Solution: Update Firestore Security Rules

### Step-by-Step Instructions:

#### 1. Access Firebase Console
- Open your web browser
- Go to: **https://console.firebase.google.com/**
- Sign in with your Google account
- Select the **"unikalkulus"** project from the project list

#### 2. Navigate to Firestore Rules
- In the left sidebar, click on **"Firestore Database"**
- At the top of the page, click the **"Rules"** tab
- You will see the current security rules

#### 3. Replace the Current Rules
Copy and paste the following security rules to replace whatever is currently there:

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

#### 4. Publish the Changes
- Click the **"Publish"** button at the top right
- Confirm the changes when prompted
- Wait 10-30 seconds for the changes to take effect

#### 5. Test the App
- Have users restart the UniKalkulus mobile app
- Log in to an account
- Complete a quiz
- The quiz results should now save successfully!

---

## What These Rules Do:

✅ **Allow authenticated users** to read and write their own user document  
✅ **Store quiz results** in each user's personal document  
✅ **Prevent users** from accessing other users' data  
✅ **Block unauthenticated access** to keep data secure  

---

## Expected Outcome:

After updating these rules:
- ✅ No more "permission denied" errors
- ✅ Quiz results will save successfully
- ✅ Users can view their quiz history in their profile
- ✅ Data remains secure and private

---

## Alternative (Testing Only - Less Secure):

If you need a quick test and don't care about security temporarily, you can use this simpler rule:

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

⚠️ **Warning:** This allows any authenticated user to access all documents. Only use for testing!

---

## Need Help?

If you encounter any issues or have questions:
1. Make sure you're signed in to the correct Firebase project
2. Verify the rules were published successfully
3. Wait a full minute after publishing
4. Try clearing the app cache and restarting

---

**Document Created:** January 5, 2026  
**Project:** UniKalkulus Mobile App  
**Issue:** Firestore Permission Denied Error
