import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD-TpVMN3apE2yvod4OP2hXj0NGqVc2PhI",
  authDomain: "kzk-store.firebaseapp.com",
  projectId: "kzk-store",
  storageBucket: "kzk-store.appspot.com",
  messagingSenderId: "605092024123",
  appId: "1:605092024123:web:f81378eb823a89953ef11e",
  measurementId: "G-XSD9C01QC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore()
const storage = getStorage()

export {analytics,auth,db,storage}