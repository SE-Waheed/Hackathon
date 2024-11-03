import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"; 

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateCreated:serverTimestamp(),
  role:""
};
export default function Register() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setISProcessing] = useState(false);
  const [selectedValue,setSelectedValue] = useState("")

  const navigate = useNavigate();
  const handleSelect = (e) => {
    setSelectedValue((s) => ({ ...s, role: e.target.value }));
  };

  const options = [
    { value: '', label: 'Please Select Role' },
    { value: 'customer', label: 'Customer' },
    { value: 'admin', label: 'Admin' },

  ]
  

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = state;

    const fullNameuser = fullName.trim();
    if (fullNameuser.length < 3) {
      return window.toastify("The name lenght is less then 3 ", "error");
    }
    if (!window.isEmail(email)) {
      return window.toastify("Invalid email ", "error");
    }
    if (password.length < 6) {
      return window.toastify("Password lenght is less than 6", "error");
    }
    if (password !== confirmPassword) {
      return window.toastify("Password not matched", "error");
    }
    setISProcessing(true);
    // const auth = useAuth()

    createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const userData = {
          id: user.uid,
          fullName: state.fullName,
          email: state.email,
          dateCreated: serverTimestamp(),
          role: selectedValue.role,

        };
        const addDataToDB = async()=>{
          try {
            const docRef = doc(db, "users",user.uid);
            await setDoc(docRef,userData);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        if (!selectedValue.role) {
          return window.toastify("Please select a role", "error");
        }
        else{

          addDataToDB()
        }
        
        console.log("user" ,user)
        window.toastify("A new user has been sucessfully added","success")
        navigate("/auth/login");
          


        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
            case "auth/email-already-in-use":
                window.toastify("Email already in use","error")
                
                break;
        
            default:
                window.toastify(errorMessage,"error")
                break;
        }
        // ..
      })
      .finally(()=>{
        setISProcessing(false);
      })


  };

  const handleKeyPress = (e)=>{
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }

  return (
    <>
      <main className="py-5 ">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
              <form action="" className="form-control">
                <h1>Register</h1>
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
                <select
                  class="form-select"
                  placeholder="Select Role"
                  name="role"
                  style={{ width: "100%" }}
                  
                  onChange={handleSelect}
                >
                  {options.map(option=>(
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                {/* <input type="text" name="username" placeholder='Enter UserName' id="" /> */}
                {/* <input type="email" name="email" placeholder='Enter Email' id="" /> */}
                <Password
                  inputMode="password"
                  placeholder="Enter Password"
                  name="password"
                  className="p-2 mb-2 mt-2"
                  onChange={handleChange}

                />
                <Password
                  inputMode="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="p-2 mb-2 mt-2"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}

                />
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  block
                  className="p-2 mb-2 mt-2 "
                  loading={isProcessing}
                >
                  Register
                </Button>
                <Link to="/auth/login" className="text-black">
                  Already have account{" "}
                  <span className="text-primary">Login</span>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
