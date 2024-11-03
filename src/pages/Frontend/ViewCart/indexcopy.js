import React, {  useEffect, useState } from "react";
import { Button, Space, Table } from "antd";

import { useOrderContext } from "../../../context/OrderContext";
// import './OverlappingPage.css';

export default function ViewCart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch,calculateTotal, getData } = useOrderContext();

  useEffect(() => {
    getData().then((data) => setData(data));
    setLoading(false)
  }, [getData]);
  // console.log("getData",getData)
  console.log("data",data)
  console.log("calculate",calculateTotal)

  if (loading) {
    return <div>Loading...</div>;
  }



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
      render: () => <p>{calculateTotal}</p>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => dispatch({ type: "DELETE_ITEM_IN_ORDER_LIST", payload: { id: record.id } })} danger>
            Delete
          </Button>
        </Space>
      ),
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
