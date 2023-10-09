// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyIyANeRLc1ITdlIBzDobYlh7WxUZ-3u0",
    authDomain: "lpwedding-f6b78.firebaseapp.com",
    projectId: "lpwedding-f6b78",
    storageBucket: "lpwedding-f6b78.appspot.com",
    messagingSenderId: "393100920263",
    appId: "1:393100920263:web:eaf4bc6c92ba4914b8c5e2"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 