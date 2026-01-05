import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD9cVHAxlUwR2ReL6eYAMy1g17CWTti68g",
  authDomain: "unikalkulus.firebaseapp.com",
  projectId: "unikalkulus",
  storageBucket: "unikalkulus.firebasestorage.app",
  messagingSenderId: "456881922457",
  appId: "1:456881922457:web:633ba9ff3ca2463579f308",
  measurementId: "G-JNL1VCN0YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };

