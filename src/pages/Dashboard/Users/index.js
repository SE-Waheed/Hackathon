import React, { useState, useEffect, useCallback } from "react";
import { Table } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const columns = [
  {
    title: "User UId",
    dataIndex: "userId",
    key: "userId",
    render: (text, record) => (
        <p>
          {text}  {record.id}
        </p>
      ),
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: "dateCreated",
  },

    // {
    //   title: "Status",
    //   key: "tags",
    //   dataIndex: "tags",

    //   render: (_, { tags,record }) => (
    //     <>
    //       {tags && tags.map((tag) => {
    //         let color = record.id ? "green" : "red";
    //         let text = record.id ? "Active" : "Not Active";
    //         return (
    //           <Tag color={color} key={tag}>
    //             {text}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
];

export default function Users() {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const q = query(collection(db, "users"), where("email", "!=", ""));

      const querySnapshot = await getDocs(q);
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
