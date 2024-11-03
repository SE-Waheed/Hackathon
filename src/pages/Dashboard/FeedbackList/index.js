import React, { useCallback, useEffect, useState } from "react";
import { Table, } from "antd";
import { collection, getDocs, query, } from "firebase/firestore";
import { db } from "../../../config/firebase";






export default function FeedbackList() {
  const [data, setData] = useState([]);
  


  const getData = useCallback(async () => {
    try {
        const q = query(collection(db, "feed-back"));

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
 


  const columns = [
    {
      title: "user Id",
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
      title: "Feedback",
      dataIndex: "comment",
      key: "comment",
      
    },
    
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text)=><p>{new Date(text*1000).toLocaleString()}</p>
      
    },
    
  
      
      
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
