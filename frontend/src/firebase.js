// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_BASE_API_KEY,
  authDomain: "blog-website-d00f9.firebaseapp.com",
  projectId: "blog-website-d00f9",
  storageBucket: "blog-website-d00f9.firebasestorage.app",
  messagingSenderId: "200746550205",
  appId: "1:200746550205:web:0d4154ff31543fad45c8d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);