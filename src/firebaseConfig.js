// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7nYROUHmv3jVRgOdEdElwIFhJ6atYiSQ",
  authDomain: "v-library-bfee5.firebaseapp.com",
  projectId: "v-library-bfee5",
  storageBucket: "v-library-bfee5.firebasestorage.app",
  messagingSenderId: "424438291628",
  appId: "1:424438291628:web:dd3f74ed23fb342b3b5309",
  measurementId: "G-5Z6BBRCZ2Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
