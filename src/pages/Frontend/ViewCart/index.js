import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Result, Space, Table } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
// import './OverlappingPage.css';

export default function ViewCart() {
  const [data, setData] = useState([]);

  const { user } = useAuthContext();

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "Order-list", itemId));

      setData(data.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  //   const currentUser = user.uid
  console.log("user", user);
  const getData = useCallback(async () => {
    try {
      const q = query(
        collection(db, "Order-list"),
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
  console.log("data", data);

  const subTotal = () => {
    let subTotal = 0;
    for (let index = 0; index < data.length; index++) {
      subTotal += data[index].numberOfPieces * data[index].itemPrice;
    }
    console.log("sub total", subTotal);
    return subTotal;
  };
  // const total = data.reduce((acc, current) => {
  //   return acc + current.numberOfPieces * current.itemPrice;
  // }, 0);
  
  useEffect(() => {
    subTotal();
  });
  

  const [showOverLappingPage, setShowOverLappingPage] = useState(false);
  const confirmOrder = () => {

    setShowOverLappingPage(true);


    console.log("i am overlapping page");
  };
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [order,setOrder] = useState({adress:"",mobileNumber:""});
  const handleChange = (e)=>{
    setOrder((s)=>({...s,[e.target.name]:e.target.value}))
  }
  const successOrder = async() => {
    setShowSuccessPage(true);
    try {
      const orderRef = doc(db,"orders",user.uid)
      await setDoc(orderRef,{
        id:user.uid,
        order:data,
        adress:order.adress,
        totalAmount:subTotal(),

        mobileNumber:order.mobileNumber
      })
      
    } catch (error) {
      console.log("error",error)
      
    }
    try {
      const q = query(collection(db, "Order-list"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.log("error",error)

    }
    setShowOverLappingPage(false);

    console.log("i am success overlapping page");
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Item Price",
      dataIndex: "itemPrice",
      key: "itemPrice",
    },
    {
      title: "Number of Pieces",
      dataIndex: "numberOfPieces",
      key: "numberOfPieces",
    },
    {
      title: "Total",
      key: "total",
      render: (record) => <p>{record.numberOfPieces * record.itemPrice}</p>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <div className="container">
        <div className="row">
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="col"
          >
            <h3 style={{ display: "inline" }}>Sub Total: {subTotal()}</h3>
            <Button type="primary" onClick={() => confirmOrder()}>
              Confirm Order
            </Button>
            {showOverLappingPage && (
              <>
                <div className="container overlapping-page">
                  <div className="row">
                    <div className="col overlapping-page-content">
                      <form action="" className="">
                        <Input
                          type="text"
                          placeholder="Adress"
                          name="adress"
                          className="m-2"
                          onChange={handleChange}

                        />
                        <Input
                          type="number"
                          placeholder="Mobile Number"
                          name="mobileNumber"
                          className="m-2"
                          onChange={handleChange}
                        />
                        {/* <Select
                          showSearch
                          style={{
                            width: "100%",
                          }}
                          className="m-2"
                          placeholder="Search to Select"
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={[
                            {
                              value: "1",
                              label: "On Delivery",
                            },
                            {
                              value: "2",
                              label: "Easypaisa",
                            },
                            {
                              value: "3",
                              label: "Cradit Card",
                            },
                          ]}
                        /> */}

                        <Button
                          className="m-2"
                          onClick={() => setShowOverLappingPage(false)}
                        >
                          Close
                        </Button>
                        <Button onClick={() => successOrder()}>
                          Submit Order
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showSuccessPage && (
              <>
                <div className="container overlapping-page">
                  <div className="row">
                    <div className="col overlapping-page-content">
                      <Result
                        status="success"
                        title="Order Successfully Subbimited"
                        subTitle={`Order number: ${user.uid} Estimated Delivry time 1-2 days, please wait.`}
                        extra={[
                          <Link to="/">
                          <Button  type="primary" key="console">
                            Go Home
                          </Button>
                          </Link>
                          ,
                          <Link to="/">
                          <Button
                            key="buy"
                            onClick={() => setShowSuccessPage(false)}
                            >
                            Buy Again
                          </Button>
                            </Link>,
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
