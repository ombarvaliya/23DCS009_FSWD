// Firebase config and exports
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAglzObbdjSC90f1FWEdro1KK3LuglrHg8",
  authDomain: "practical11-54c3b.firebaseapp.com",
  projectId: "practical11-54c3b",
  storageBucket: "practical11-54c3b.firebasestorage.app",
  messagingSenderId: "651488193679",
  appId: "1:651488193679:web:e46e135ab6917ef55994fa",
  measurementId: "G-CBQCMYCLSH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider, serverTimestamp };
