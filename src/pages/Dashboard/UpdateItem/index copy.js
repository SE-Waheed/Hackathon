import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../context/FirebaseContext/FirebaseContext";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
function UpdateProducts({id}) {
  const [model, setModel] = useState(false);
  const {db}=useFirebase()
  const {getData}=useAuthContext()
  const [products, setProducts] = useState({
    productName:'',
    imageUrl:'',
    price:'',
    category:'',
    description:"",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
          month: "short",
          day: "2-digit",
          year: "numeric",
      })
  });
// const {productName,imageUrl,price,category,description,date,time}=products
const categoryList=[{name:"mobile"},{name:"laptop"},{name:"phone"},{name:"tablet"},{name:"computer"}]
const getSingleProductData=async()=>{
const firebaseData=await getDoc(doc(db,'product',id))
const product=firebaseData.data()

// const{  productName,imageUrl,price,category,description,date,time}=product
// console.log(productName,imageUrl,price,category,description,date,time)
setProducts( 
  {productName: product.productName,
  imageUrl:product.imageUrl,
  price:product.price,
  category:product.category,
  description:product.description,
  time:product.time,
  date: product.date})
}
const handleChange=(e)=>{
  setProducts((s)=>({...s,[e.target.name]:e.target.value}))

}
const handleSubmit=(e)=>{
e.preventDefault()
putData()
getData()

// getSingleProductData()
}
const putData=async()=>{
await setDoc(doc(db,'product',id),products)
toast('product added successfully')
}
useEffect(()=>{
  getSingleProductData()
},[])


  return (
      <>
      <button
        onClick={() => setModel(true)}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </button>
      {/* <!-- Main modal --> */}
      {model ? (
        <div
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Product
                </h3>
                <button
                  onClick={() => setModel(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input onChange={handleChange}
                      type="text"
                      name="productName"
                      id="productName"
                      value={products.productName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Apple iMac 27&ldquo;"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    imageUrl
                    </label>
                    <input onChange={handleChange}
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      value={products.imageUrl}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Apple"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input onChange={handleChange}
                      type="number"
                      name="price"
                      id="price"
                      value={products.price}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select onChange={handleChange}
                      name="category"
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                    {categoryList.map((value,index)=>{
                            const {name}=value
                            return(<>
                               <option key={index} value={name}>{name}</option>
                            
                            
                            
                            </>)
                         })}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea onChange={handleChange}
                      
                      id="description"
                      rows="5"
                      defaultValue={products.description}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update product
                  </button>
                  <button
                    type="button"
                    onClick={() => setModel(false)}
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <svg
                      className="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UpdateProducts;