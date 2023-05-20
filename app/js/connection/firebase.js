import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Configuración de firebase
const firebaseConfig = {
  apiKey: "AIzaSyBlbGMnS8UVk3ZUrlNDgYsX0q4jLum-aWA",
  authDomain: "pet-tracking-79e8a.firebaseapp.com",
  projectId: "pet-tracking-79e8a",
  storageBucket: "pet-tracking-79e8a.appspot.com",
  messagingSenderId: "248212976670",
  appId: "1:248212976670:web:8fb86899b7441a291e2a0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);