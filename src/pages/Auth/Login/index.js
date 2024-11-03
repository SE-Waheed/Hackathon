import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
// import {toastify} form "../../../config/global"
const initialState = {
  email: "",
  password: "",
};
export default function Login() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setISProcessing] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, dispatch } = useAuthContext();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));



  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (password.length < 6) {
      return window.toastify("Password lenght is less than 6", "error");
    }

    setISProcessing(true);
    // const auth = useAuth()
    // isAuthenticated(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "SET_LOGGED_IN", payload: { user } });
        console.log("user", user);
        window.toastify("Login Sucessfull", "success");
        // setState({ isAuthenticated: true });
        console.log("isAuthenticated", isAuthenticated);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/email or password invalid":
            window.toastify("Email or Password invalid", "error");

            break;

          default:
            window.toastify(errorMessage, "error");
            break;
        }
        // ..
      })
      .finally(() => {
        setISProcessing(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <main className="py-5 ">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
              <form action="" className="form-control">
                <h1>Login</h1>

                <Input
                  inputMode="email"
                  placeholder="Enter email"
                  name="email"
                  className="p-2 mb-2 mt-2"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
                {/* <input type="text" name="username" placeholder='Enter UserName' id="" /> */}
                {/* <input type="email" name="email" placeholder='Enter Email' id="" /> */}
                <Password
                  inputMode="password"
                  placeholder="Enter Password"
                  name="password"
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
                  Login
                </Button>
                <Link to="/auth/register" className="text-black">
                  Do not have account{" "}
                  <span className="text-primary">Register</span>
                </Link>
                <br />
                <Link to="/auth/forgotpassword" className="text-black">
                  {" "}
                  <span className="text-primary">Forgot Password</span>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
