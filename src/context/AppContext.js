import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = createContext();
export default function AppContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null); // Add a state variable for uid

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      console.log("user id found");
    } else {
      setUid(null);
      console.log("user id not found");
    }
  });

  const loadUserData = useCallback(async () => {
      
      if (uid) {
        try {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);
          console.log("userSnap", userSnap);
          if (userSnap.exists()) {
            const currentUserData = userSnap.data();
            setUserData(currentUserData);
            console.log("userData", userData);
          } else {
            console.log("User document not found");
          }
          
            
          
        } catch (error) {
          console.log("error", error);
        }
      } else {
        console.log("user Uid not found");
      }
    
  }, [uid]); // Add uid as a dependency

  

  useEffect(() => {
    if (uid) { // Check if uid is not null
      loadUserData();
    }
  }, [uid, loadUserData]);

  


  return (
    <App.Provider
      value={{ userData, setUserData, loadUserData }}
    >
      {children}
    </App.Provider>
  );
}
export const useAppContext = () => useContext(App);