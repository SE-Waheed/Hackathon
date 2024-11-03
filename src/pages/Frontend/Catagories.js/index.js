import React, { useCallback, useEffect, useState } from 'react';
import { Button, InputNumber, Space,  } from 'antd';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import  {  HeartOutlined } from "@ant-design/icons";
import { db } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';


const initialState = { numberOfPieces: 1 }
const Catagories = () => {

  const { user } = useAuthContext()
  const { catagory } = useParams()

  const [state, setState] = useState(initialState)
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const q = query(collection(db, "menuItems"), where("catagory", "==", catagory));

      const querySnapshot = await getDocs(q);
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  }, [catagory]);
  useEffect(() => {
    getData();
  }, [getData]);
  console.log("data price",data.itemName)

  const addDataToDB = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "Order-list"), {
        itemName: data.itemName,
        description: data.description,
        itemPrice: data.itemPrice,
        numberOfPieces: state.numberOfPieces,
        userId: user.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const addItemToWishList = async (data) => {
    // console.log("uid",id)
    try {
       await addDoc(collection(db, "Wish-list"), {
        itemName: data.itemName,
        description: data.description,
        itemPrice: data.itemPrice,
        userId: user.uid,
        avatar:data.avatar
        // itemId:id
      });
      console.log("Document Added to db: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleChange = (value) =>
    setState((s) => ({ ...s, numberOfPieces: value }));
  const handleAdd = (data) => {
    const { numberOfPieces } = state
    console.log("itemName", data.itemName)
    console.log(numberOfPieces)
    console.log("data", data)
    console.log(data.itemPrice)
    addDataToDB(data)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data.length) {
    return <div>No data found</div>;
  }

  return (
    <div className='container-fluid '>
      <div className="row">
        <div className="col home-card">

          {/* {data.map((data) => (
            <Card
              key={data.id}

              style={{
                width: 225,
                margin: 5,
                maxHeight: 400,

              }}
              cover={
                <img
                style={{width:220,height:200,}}
                  alt="example"
                  src={data.avatar}
                />
              }
              actions={[
                <InputNumber name='numberOfPieces' onChange={handleChange} />,
                <Button onClick={() => handleAdd(data)}>Add to Cart</Button>
              ]}
            >
              <Meta
                title={data.itemName}
                description={
                    <div>
                      ${data.itemPrice}
                      <br />
                      {data.description}
                      <br />
                      <Button onClick={()=>addItemToWishList(data)}>Add to wish list</Button>
                    </div>
                  }
                />
            </Card>
          ))} */}
          {data.map((data) => (
            <div className="card m-3 p-2" style={{maxWidth:540}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={data.avatar} className="img-fluid rounded-start" alt=""/>
              </div>
              
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title" style={{}} >{data.itemName} </h3>
                  <p className="card-text">{data.description}</p>
                  <p className="card-text">{data.status} Price: ${data.itemPrice} </p>
                  <Space>
                  <InputNumber placeholder='1' name='numberOfPieces' onChange={handleChange} />
                  <Button onClick={() => handleAdd(data)}>Add to Cart</Button>
                    
                  <Button type='primary' onClick={()=>addItemToWishList(data)}><HeartOutlined /></Button>
                  </Space>

                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col">

        </div>
      </div>
    </div>
  );
};

export default Catagories;