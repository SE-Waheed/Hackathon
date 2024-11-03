import React from "react";
import { Link } from "react-router-dom";
import  { CreditCardOutlined, DownOutlined, LoginOutlined, LogoutOutlined, OrderedListOutlined, ProfileOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useAuthContext } from "../../../context/AuthContext";

const items = [
  {
    key: "1",
    label: (
      <Link to="/profile"
      >
          <span className="">Profile</span> 
      </Link>
    ),
    icon: <ProfileOutlined/>,
  },
  {
    key: "2",
    label: (
      <Link to="/myorders"
      >
          <span className="">My Orders</span> 
      </Link>
    ),
    icon: <OrderedListOutlined />  },
  {
    key: "3",
    label: (
      <Link
      >
          <span className="">Payment</span> 
      </Link>
    ),
    icon: <CreditCardOutlined />  },
  {
    key: "4",
    label: (
      <Link to="/wishlist"
      >
          <span className="">Wish List</span> 
      </Link>
    ),
    icon: <CreditCardOutlined />  },
  
];

export default function Header1() {
    const {isAuthenticated,handleLogout} = useAuthContext()
  // const handleView = ()=>{
  //   navigate("../../../pages/Frontend/ViewCart")

  // }

  return (
    <>
      <nav class="navbar bg-dark navbar-dark">
        <div class="container">
          <Link class="navbar-brand">CRUD Resturant</Link>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success " type="submit">
              Search
            </button>
          </form>
          <form>
            <Space>

            <Dropdown
              menu={{
                items,
              }}
            >
              <Link onClick={(e) => e.preventDefault()}>
                <UserOutlined />
                  <DownOutlined />
              </Link>
            </Dropdown>
            <Link to="/viewcart" ><ShoppingCartOutlined /></Link>
            {isAuthenticated === true? 
                (<Button danger type="primary" onClick={handleLogout}>

                <Link to="/" ><LogoutOutlined /></Link>
                </Button>):
                (<Button type="primary" >

                <Link to="/auth/login" ><LoginOutlined/></Link>
                </Button>)
            }
            </Space>

          </form>
        </div>
      </nav>
    </>
  );
}
