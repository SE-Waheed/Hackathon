import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";


export default function Navbar() {
  const {handleLogout} = useAuthContext()
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand" >
            CRUD Resturant
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link"  >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link"  >
                  About
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/contact" className="nav-link"  >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link"  >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/createitem" className="nav-link"  >
                  Create Item
                </Link>
              </li>
              
              <li className="nav-item dropdown">
              <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Authentication
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/auth/login" className="dropdown-item"  >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="dropdown-item"  >
                      Register
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/auth/forgotpassword" className="dropdown-item"  >
                      Forgot Password
                    </Link>
                  </li>

                </ul>
              </li>
              
            </ul>
            
              
              <Button onClick={handleLogout} type="primary" danger>Logout</Button>
             

            
            
          </div>
        </div>
      </nav>
    </>
  );
}
