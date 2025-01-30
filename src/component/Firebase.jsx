// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLjI9nn88UwRC-HJSw0AIGg5C7YTWDDmQ",
  authDomain: "payment-app-dfc27.firebaseapp.com",
  projectId: "payment-app-dfc27",
  storageBucket: "payment-app-dfc27.firebasestorage.app",
  messagingSenderId: "934188648593",
  appId: "1:934188648593:web:58ce02e122ff3bc2dd5730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db = getFirestore(app)

 export {auth,db}