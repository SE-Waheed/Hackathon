import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Space, Table } from "antd";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../../config/firebase";



const handleDelete =async(itemId)=>{
  try{
    await deleteDoc(doc(db, "Wish-list", itemId));

  }
  catch (error){
    console.error(error);
  }

}



export default function WishList() {
  const [data, setData] = useState([]);
  


  const getData = useCallback(async () => {
    try {
      const q = query(collection(db, "Wish-list"));

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
      dataIndex: "avatar",
      key: "avatar",
      
  
        
        render: (text) => <Image src={text} alt="Image"  style={{width:50,height:50}}   />,
      
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      
    },
    
    
    
  
      
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
           
            
            <Button onClick={() => handleDelete(record.id)} danger >Delete</Button>
          </Space>
        ),
      },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
