// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArhfH7TwQIPEh7jGHLZnxYGp8UyotJVg4",
  authDomain: "crud-resturant-124.firebaseapp.com",
  projectId: "crud-resturant-124",
  storageBucket: "crud-resturant-124.appspot.com",
  messagingSenderId: "21050620729",
  appId: "1:21050620729:web:03b72eeb845d18aace06e8",
  measurementId: "G-DTSDRQRZ1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore()
const storage = getStorage()

export {analytics,auth,db,storage}