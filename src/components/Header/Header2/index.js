import React, { useCallback, useEffect, useState } from "react";
import { TreeSelect } from "antd";
import { Link } from "react-router-dom";
import {
  ClockCircleOutlined,
  HomeOutlined,
  LaptopOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAppContext } from "../../../context/AppContext";


const treeData = [
  {
    value: "khari",
    title: (
      <Link to="/catagories/khari" >
      <span>
        <HomeOutlined /> Khari
      </span>
      </Link>
      
    ),
    key: "khari",

  },
  {
    value: "barBQ",
    title: (
      <Link to="/catagories/barBQ" >
      <span>
        <ClockCircleOutlined /> Bar BQ
      </span>
      </Link>
    ),
    key: "barBQ",
  },

  {
    value: "beverges",
    title: (
      <Link to="/catagories/beverges" >
      <span>
        <LaptopOutlined /> Beverges
      </span>
      </Link>
    ),
    key: "beverges",
  },
  {
    value: "fastFood",
    title: (
      <Link to="/catagories/fastFood" >
      <span>
        <MobileOutlined /> Fast Food
      </span>
      </Link>
    ),
    key: "fastFood",

  },
];

export default function Header2() {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const {user} = useAuthContext()
  const {userData} =useAppContext()
  const {isAuthenticated} =useAuthContext()
  console.log("user role",user.email)
  // const email = user.email


  const getData = useCallback(async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.uid]);
  useEffect(() => {
    getData();
  }, [getData]);
  console.log("data role",data.email)



  const onChange = (newValue) => {
    setValue(newValue);
  };
  const onPopupScroll = (e) => {
    console.log("onPopupScroll", e);
  };
  return (
    <>
      <nav class="navbar  navbar-expand-lg bg-dark navbar-dark ">
        <div class="container">
          <TreeSelect
            showSearch
            style={{
              width: "30%",
            }}
            value={value}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="All Catagories"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
            onPopupScroll={onPopupScroll}
          />
          <div className="justify-content-end">

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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              {isAuthenticated?
              (userData.role === "admin"?<li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>:<li></li>)
              :
             <Link to="/dashboard" className="nav-link">
                Dashboard
                </Link> 
            }
            </ul>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
