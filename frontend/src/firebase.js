// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_BASE_API_KEY,
  authDomain: "blog-website-f7e87.firebaseapp.com",
  projectId: "blog-website-f7e87",
  storageBucket: "blog-website-f7e87.firebasestorage.app",
  messagingSenderId: "568855220083",
  appId: "1:568855220083:web:6041f486aa6f468a743f06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);