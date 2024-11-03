import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const initialState = { itemName: "", description: "", itemPrice: "" };

export default function UpdateItem() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getItemData = useCallback(async () => {
    setLoading(true);
    try {
      // Use the correct id from params to fetch the document
      const docRef = doc(db, "menuItems", id); // Corrected from "id" to id
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setState(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching item data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getItemData();
  }, [getItemData]);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { itemName, description, itemPrice } = state;

    setIsProcessing(true);
    const formData = {
      itemName,
      description,
      itemPrice,
      dataUpdated: serverTimestamp(),
    };
    try {
      const docRef = doc(db, "menuItems", id);

    await setDoc(docRef, formData, { merge: true });
      
      console.log("Menu updated successfully");
      setState(initialState); 
    } catch (e) {
      console.log("Error updating menu", e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col col-lg-6 col-md-8 col-sm-10 text-center">
              <div className="card p-4">
                <form onSubmit={handleSubmit}> {/* Added onSubmit to form */}
                  <h1 className="text-primary mb-5">Update Items In Menu</h1>

                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Item Name"
                        className="form-control mb-3"
                        name="itemName"
                        value={state.itemName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        placeholder="Item Price"
                        className="form-control mb-3"
                        name="itemPrice"
                        value={state.itemPrice}
                        onChange={handleChange}
                      />
                      <textarea
                        placeholder="Description"
                        className="form-control mb-3"
                        name="description"
                        rows={3}
                        value={state.description}
                        onChange={handleChange}
                      />
                      

                      <Button
                        type="primary"
                        block
                        className="p-2 mb-2 mt-2"
                        htmlType="submit" // Changed to use htmlType for form submission
                        loading={isProcessing} // Show loading state on button
                      >
                        Update Item
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}