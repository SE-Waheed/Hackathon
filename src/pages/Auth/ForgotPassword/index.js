import React, { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Input,Button } from 'antd';

const initialState = {email:""}
export default function ForgotPassword() {


  const [state,setState] = useState(initialState)
  const [isProcessing,setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) =>setState((s)=>({...s,[e.target.name]:e.target.value}))

  const handleSubmit =(e)=>{
    e.preventDefault()
    const {email} = state

    
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsProcessing(true)
      window.toastify("Verification Email send","success")
      navigate("/auth/login")
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ..
    })
    .finally(()=>{
      setIsProcessing(false)
    })
  }

  return (
    <>
<main className="py-5 ">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
              <form action="" className="form-control">
                <h1>Forgot Password</h1>
                
                <Input
                  inputMode="email"
                  placeholder="Enter email"
                  name="email"
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
                  Send Verification Email
                </Button>
                
              </form>
            </div>
          </div>
        </div>
      </main>      
    </>
  )
}
