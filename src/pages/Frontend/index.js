import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "../../components/Footer";
import ViewCart from "./ViewCart";
import Header2 from "../../components/Header/Header2";

import MyOrders from "./MyOrders";
import Header1 from "../../components/Header/Hrader1";
import Catagories from "./Catagories.js";
import Profile from "./Profile/index.js";
import WishList from "./WishList/index.js";
import Feedback from "./FeedBack/index.js";

export default function Frontend() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Header1 />
      <Header2 />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/viewcart" element={<ViewCart />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/wishlist" element={<WishList/>} />
              <Route path="/feedback" element={<Feedback/>} />
              <Route path="/catagories/:catagory" element={<Catagories />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
    </>
  );
}