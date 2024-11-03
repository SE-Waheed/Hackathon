import { Button, Input } from "antd";
import React, { useState } from "react";
import { db } from "../../../config/firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"; 
import { useAuthContext } from "../../../context/AuthContext";
import TextArea from "antd/es/input/TextArea";

const initialState = {
  fullName: "",
  email: "",
  comment:"",
  date:serverTimestamp(),
};
export default function Feedback() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setISProcessing] = useState(false);
  const {user} = useAuthContext()

  

  

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, comment } = state;

    
    setISProcessing(true);

    
        const addDataToDB = async()=>{
            const formData = {
                fullName: fullName,
                email: email,
                comment: comment,
                userId:user.uid,
                date:serverTimestamp(),
            }
          try {
            const docRef = doc(db, "feed-back",user.uid);
            await setDoc(docRef,formData);
            console.log("Document written with ID: ");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        

          addDataToDB()
          setISProcessing(false)
        
        
       


        
       

  };

  

  return (
    <>
      <main className="py-5 ">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
              <form action="" className="form-control">
                <h1>Feedback</h1>
                <Input
                  inputMode="text"
                  placeholder="Enter FullName"
                  name="fullName"
                  className="p-2 mb-2 mt-2"
                  onChange={handleChange}
                />
                <Input
                  inputMode="email"
                  placeholder="Enter email"
                  name="email"
                  className="p-2 mb-2 mt-2"
                  onChange={handleChange}

                />
                <TextArea
                placeholder="Enter your feedback"
                name="comment"
                className="p-2 mb-2 mt-2"
                onChange={handleChange}

                />
                
               
                
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  block
                  className="p-2 mb-2 mt-2 "
                  loading={isProcessing}
                >
                  Submit
                </Button>
                
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
