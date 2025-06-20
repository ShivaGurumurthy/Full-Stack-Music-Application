// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNe3IfirYRNpG6j3Oz3u3tOUIGTliD7Zs",
  authDomain: "innovators-hub-music-53079.firebaseapp.com",
  projectId: "innovators-hub-music-53079",
  storageBucket: "innovators-hub-music-53079.firebasestorage.app",
  messagingSenderId: "942003823583",
  appId: "1:942003823583:web:2979ff4dced02e09de1a6a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Variable for Authentication!
export const __AUTH=getAuth(firebaseApp)

//Variable for Databases!
export const __DB=getFirestore(firebaseApp)