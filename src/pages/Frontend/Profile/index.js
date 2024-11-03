import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Button, Space, Table, Modal } from "antd";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user, handleLogout } = useAuthContext();

  useEffect(() => {
    const getUser  = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };
    getUser ();
  }, [user.uid]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const ordersArray = [];
        querySnapshot.forEach((doc) => {
          ordersArray.push({ id: doc.id, ...doc.data() });
        });
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
      dataIndex: "orderId",
      key: "orderId",
      render: (text, record) => (
        <Button type="link" onClick={() => handleOrderClick(record)}>
          {text} {record.id}
        </Button>
      ),
    },
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mt-5">
      <div className="profile-header">
        <h2>{userData.fullName}</h2>
        <p className="text-muted">{userData.email}</p>
        <p>Location: New York, USA</p>
      </div>

      <div className="text-center mt-4">
        <Space>
          <Link to="/feedback">
        <Button  type="primary">
          Send Feedback
        </Button>
          </Link>
          <Button danger type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Space>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Order History</h3>
            <Table columns={columns} dataSource={orders} />
          </div>
        </div>
      </div>

      <Modal
        title="Order Details"
        visible={visible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <h4>Order ID: {selectedOrder.id}</h4>
            <p>Items:</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.order && selectedOrder.order.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{order.itemName}</td>
                    <td>{order.itemPrice}</td>
                    <td>{order.numberOfPieces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePage;