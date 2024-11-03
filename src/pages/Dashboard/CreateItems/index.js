import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../config/firebase";
import { Button } from "antd";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function CreateItems() {
  const [state, setState] = useState({
    itemName: "",
    description: "",
    status: ["Aviliable"],
    dateCreated: serverTimestamp(),
    catagory:""
    
  });
  const [image, setImage] = useState(null);
  const [selectedValue,setSelectedValue] = useState("")
  const [isProcessing, setISProcessing] = useState(false);


  const handleSelect = (e) => {
    setSelectedValue((s) => ({ ...s, catagory: e.target.value }));
  };

  const options = [
    { value: '', label: 'Please Select catagory' },
    { value: 'khari', label: 'Khari' },
    { value: 'fastFood', label: 'Fast Food' },
    { value: 'barBQ', label: 'Bar BQ' },
    { value: 'beverges', label: 'Beverges' },

  ]


  
 

  

  
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `/image/${Date.now()+file.name}`);

  
    const uploadTask = uploadBytesResumable(
      storageRef,
      file
    );
    return new Promise((resolve,reject)=>{
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
                console.log("Upload is complete")
          }
    
        },
        (error) => {
            console.log("error Uplaoding File",error)
            reject(error)
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL)
          });
        }
      );
    })
  
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setISProcessing(true)
    if (image) {
      const downloadURL = await uploadFile(image);
      console.log("File uploaded successfully", downloadURL);
      const addDataToDB = async () => {
        
        try {
          const docRef = await addDoc(collection(db, "menuItems"), {
            itemName: state.itemName,
            description: state.description,
            status: state.status,
            dateCreated: state.dateCreated,
            itemPrice: state.itemPrice,  
            avatar: downloadURL,
            catagory:selectedValue.catagory,
              });
              window.toastify("A new item has been sucessfully added","success")
              setISProcessing(false)

          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
      addDataToDB(downloadURL);
    } else {
      console.log("No file selected");
    }
  };
  
  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-6 col-md-8 col-sm-10 text-center">
              <div className="card p-4 ">
                <form>
                  <h1 className="text-primary mb-5">Add Items In Menu</h1>

                  <input
                    type="text"
                    placeholder="Item Name"
                    className="form-control mb-3"
                    name="itemName"
                    onChange={handleChange}
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="form-control mb-3"
                    name="description"
                    rows={3}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Item Price"
                    className="form-control mb-3"
                    name="itemPrice"
                    onChange={handleChange}
                  />

                  
                  <select
                  className="form-select mb-3"
                  placeholder="Select Catagory"
                  name="catagory"
                  style={{ width: "100%" }}
                  
                  onChange={handleSelect}
                >
                  {options.map(option=>(
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>

                   <input
                    type="file"
                    name="avatar"
                    id=""
                    className="form-control mb-3"
                    onChange={(e) => setImage(e.target.files[0])}                  /> 

                  <Button
                    type="primary"
                    block
                    className="p-2 mb-2 mt-2 "
                    loading={isProcessing}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add Item
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
