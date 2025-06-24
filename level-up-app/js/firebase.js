// Import Firebase modules from correct CDN
import { initializeApp } from "https://firebasecdn.googleapis.com/firebasejs/10.12.0/firebase-app.js"; 
import { getAuth } from "https://firebasecdn.googleapis.com/firebasejs/10.12.0/firebase-auth.js"; 
import { getFirestore } from "https://firebasecdn.googleapis.com/firebasejs/10.12.0/firebase-firestore.js"; 
import { getStorage } from "https://firebasecdn.googleapis.com/firebasejs/10.12.0/firebase-storage.js"; 

// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCSHtcsnC5AnfEEXnAQsP7UmYpSvoAzLmQ",
  authDomain: "levelup-2cea4.firebaseapp.com",
  projectId: "levelup-2cea4",
  storageBucket: "levelup-2cea4.firebasestorage.app",
  messagingSenderId: "491625630322",
  appId: "1:491625630322:web:9e4c7730d8a4aeda4a10eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use in other files
export { auth, db, storage };