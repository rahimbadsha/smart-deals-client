// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC83t1kK_QPbUwed9kECk5_8dW5SHLDOP8",
  authDomain: "smart-deals-27a7e.firebaseapp.com",
  projectId: "smart-deals-27a7e",
  storageBucket: "smart-deals-27a7e.firebasestorage.app",
  messagingSenderId: "298215267091",
  appId: "1:298215267091:web:9fa6eee74dbf1f5cc8d8e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);