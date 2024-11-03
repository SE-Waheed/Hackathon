import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Space, Table, Tag } from "antd";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";

const handleDelete =async(itemId)=>{
  try{
    await deleteDoc(doc(db, "menuItems", itemId));

  }
  catch (error){
    console.error(error);
  }

}
const columns = [
  {
    title: "Item UId",
    dataIndex: "itemId",
    key: "itemId",
    render: (text, record) => (
        <p>
          {text}  {record.id}
        </p>
      ),
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
    key: "itemName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Image",
    dataIndex: "imageURL",
    key: "imageURL",
    

      
      render: (text) => <Image src={text} alt="Image"  style={{width:50,height:50}}   />,
    
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    
  },
  {
    title: "DateCreated",
    dataIndex: "dateCreated",
    key: "dateCreated",
    render: (text)=><p>{new Date(text*1000).toLocaleString()}</p>
    
  },
  

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render:(text,record) => 

      <Tag color={text === "incomplete"? "error":"success"}
      onClick={()=>{
        text= "complete"
      }} 
      
      >{text}</Tag>

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`../UpdateItem`} state={{ itemData: record }}>
          <Button type="primary" ghost >Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(record.id)} danger >Delete</Button>
        </Space>
      ),
    },
];

export default function Itemlist() {
  const [data, setData] = useState([]);


  const getData = useCallback(async () => {
    try {
      const q = query(collection(db, "menuItems"), where("status", "!=", ""));

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
  data.forEach((item) => {
    console.log("imageUrl", item.imageURL); // log the imageURL for each item
  });
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
