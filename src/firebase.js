// ─── src/firebase.js ─────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1OoyJoGjOnfhiF54_bA9wpC35JEOwmWg",
  authDomain: "looksmaxer-cd7f6.firebaseapp.com",
  projectId: "looksmaxer-cd7f6",
  storageBucket: "looksmaxer-cd7f6.firebasestorage.app",
  messagingSenderId: "610981956465",
  appId: "1:610981956465:web:5c1ff7d79c4b242ebf84d0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);