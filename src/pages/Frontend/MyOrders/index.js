import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Table } from "antd";
import OrderStatus from "../OrderStatus";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const ordersArray = [];
        querySnapshot.forEach((doc) => {
          ordersArray.push({ id: doc.id, ...doc.data() });
        });
        console.log("order", ordersArray);
        setOrders(ordersArray);
      } catch (error) {
        console.error("Error getting orders:", error);
      }
    };
    getOrders();
  }, [user.uid]);

  

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id", // Use the id directly from the orders
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Item Price",
      dataIndex: "itemPrice",
      key: "itemPrice",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "numberOfPieces",
      key: "numberOfPieces",
      render: (text) => <p>{text}</p>,
    },
  ];

  const dataSource = orders.length > 0 ? orders[0].order : []; 

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <h4>Sub Total: {orders[0].totalAmount}</h4>
      <div style={{ padding: '20px' }}>
      <OrderStatus />
    <p>Estimated Time 30 min</p>
    </div>
    </>
  );
};

export default OrderPage;