# ✅ Testing Checklist

## Pre-Launch Checklist

### 1. Installation ✓
- [x] Dependencies installed (`npm install` completed)
- [ ] No errors in package installation
- [ ] Node.js version 14+ installed

### 2. Development Server
- [ ] Run `npm start` successfully
- [ ] QR code appears in terminal
- [ ] Metro bundler starts without errors
- [ ] Can access via Expo Go app

### 3. Navigation Testing

#### Home Screen
- [ ] App loads to home screen
- [ ] Hero section displays correctly
- [ ] Login button visible (when not logged in)
- [ ] Three feature cards display (Limit, Turunan, Integral)
- [ ] Quiz button visible
- [ ] Footer displays
- [ ] All text readable on mobile screen

#### Login/Register Flow
- [ ] Tap login button → opens login screen
- [ ] Can switch between Login and Register forms
- [ ] Can enter email and password
- [ ] Register creates new account successfully
- [ ] Login works with created account
- [ ] Error messages display for invalid input
- [ ] Redirects to home after successful auth
- [ ] User profile appears after login
- [ ] Back button returns to home

#### Material Screen
- [ ] Tap feature card → opens material screen
- [ ] Header displays with correct icon
- [ ] Content sections display properly
- [ ] Can scroll through all content
- [ ] Navigation buttons work (Limit/Turunan/Integral)
- [ ] Switching sections updates content
- [ ] Quiz button at bottom works
- [ ] All mathematical notation readable

#### Quiz Screen
- [ ] Opens quiz screen successfully
- [ ] Question counter displays (e.g., "1 dari 15")
- [ ] Score counter visible
- [ ] Progress bar shows correctly
- [ ] Question text displays
- [ ] All 4 answer options visible
- [ ] Can tap an answer option
- [ ] Correct answer turns green
- [ ] Wrong answer turns red
- [ ] Explanation appears after answering
- [ ] "Lanjut" button appears after answering
- [ ] Next question loads properly
- [ ] All 15 questions work
- [ ] Results screen shows at the end
- [ ] Final score displays correctly
- [ ] Percentage calculated correctly
- [ ] Emoji and message display
- [ ] "Ulangi Quiz" button works
- [ ] "Kembali" button returns to home

#### Profile Screen
- [ ] User avatar/initial displays
- [ ] User name shows correctly
- [ ] Email displays
- [ ] Statistics cards show:
  - [ ] Total quizzes completed
  - [ ] Average score percentage
- [ ] Quiz history displays (if available)
- [ ] Navigation menu works
- [ ] Logout button visible
- [ ] Logout confirmation alert appears
- [ ] Logout redirects to home
- [ ] User state cleared after logout

### 4. Firebase Integration

#### Authentication
- [ ] Can register new user
- [ ] Email validation works
- [ ] Password minimum 6 characters enforced
- [ ] Login persists after app restart
- [ ] User stays logged in
- [ ] Can logout successfully

#### Firestore Database
- [ ] User document created on registration
- [ ] Profile data saved correctly
- [ ] Quiz attempts saved after completion
- [ ] Quiz history loads in profile
- [ ] Timestamps recorded correctly
- [ ] Data persists between sessions

### 5. Mobile UX

#### Touch Interactions
- [ ] All buttons respond to touch
- [ ] Touch targets large enough (44px+)
- [ ] Visual feedback on button press
- [ ] No accidental touches
- [ ] Scrolling smooth

#### Visual Design
- [ ] Colors consistent across screens
- [ ] Text readable on mobile screen
- [ ] Spacing appropriate for mobile
- [ ] No overlapping elements
- [ ] Icons display correctly

#### Performance
- [ ] App loads quickly
- [ ] Navigation transitions smooth
- [ ] No lag when scrolling
- [ ] Images load properly
- [ ] No crashes during use

### 6. Error Handling
- [ ] Network errors display user-friendly messages
- [ ] Firebase errors caught and displayed
- [ ] Invalid input shows error messages
- [ ] Loading states show spinners
- [ ] Empty states handled gracefully

### 7. Platform-Specific

#### Android
- [ ] Runs on Android emulator/device
- [ ] Back button works correctly
- [ ] Status bar displays properly
- [ ] Navigation drawer/stack works
- [ ] APK can be built successfully

#### iOS (if testing)
- [ ] Runs on iOS simulator/device
- [ ] Safe area insets respected
- [ ] Status bar displays correctly
- [ ] Navigation works properly

### 8. Data Persistence
- [ ] Login persists after closing app
- [ ] User profile loads on app restart
- [ ] Quiz history available after restart
- [ ] No data loss between sessions

## Bug Report Template

If you find any issues, document them like this:

```
**Screen:** [Which screen]
**Action:** [What you did]
**Expected:** [What should happen]
**Actual:** [What actually happened]
**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three
```

## Performance Benchmarks

Target metrics:
- [ ] App launch: < 3 seconds
- [ ] Screen transition: < 300ms
- [ ] Quiz load: < 1 second
- [ ] Firebase auth: < 2 seconds
- [ ] Data fetch: < 1 second

## Accessibility Checklist
- [ ] All buttons have clear labels
- [ ] Text contrast sufficient
- [ ] Font sizes readable
- [ ] Touch targets 44px minimum
- [ ] Error messages clear and helpful

## Security Checklist
- [ ] No API keys exposed in code
- [ ] Firebase config secure
- [ ] Passwords not visible when typing
- [ ] User data encrypted in transit
- [ ] Firestore rules properly configured

## Final Checks Before Publishing
- [ ] All features tested and working
- [ ] No console errors
- [ ] No warnings in build
- [ ] App icon created
- [ ] Splash screen created
- [ ] App name finalized
- [ ] Version number updated
- [ ] Privacy policy created (if needed)
- [ ] Terms of service created (if needed)

---

## Next Steps After Testing

### If All Tests Pass ✅
1. Create app icon and splash screen
2. Build production APK: `eas build --platform android`
3. Test APK on real devices
4. Prepare Play Store listing
5. Submit to Google Play Store

### If Issues Found ❌
1. Document all bugs using template above
2. Fix critical issues first
3. Test fixes
4. Retest full checklist
5. Repeat until all pass

---

**Testing Date:** _____________  
**Tester:** _____________  
**Device:** _____________  
**OS Version:** _____________  
**App Version:** 1.0.0
