// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function CreateItems() {
//   const [item, setItem] = useState({
//     itemname: "",
//     description: "",
//     status: "",
//     id: "",
//   });
//   const [items, setItems] = useState([]); // Move users to state
  
  

  

//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setItems((s) => ({ ...s, [e.target.name]: e.target.value }));

  

//   const handleSubmit = (e) => {
//     e.preventDefault();

    
        
          
//   };

//   return (
//     <>
//       <main className="py-5">
//         <div className="container">
//           <div className="row align-items-center justify-content-center">
//             <div className="col col-lg-6 col-md-8 col-sm-10 text-center">
//               <div className="card p-4 ">
//                 <form>
//                   <h1 className="text-primary mb-5">Add Items In Menu</h1>

//                   <input
//                     type="number"
//                     placeholder="Id"
//                     className="form-control mb-3"
//                     name="id"
//                     onChange={handleChange}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Item Name"
//                     className="form-control mb-3"
//                     name="itemname"
//                     onChange={handleChange}
//                   />
//                   <textarea
//                     type="text"
//                     placeholder="Description"
//                     className="form-control mb-3"
//                     name="description"
//                     rows={3}
//                     onChange={handleChange}
//                   />
                  
//                   <input
//                     type="text"
//                     placeholder="status"
//                     className="form-control mb-3"
//                     name="status"
//                     onChange={handleChange}
//                   />

//                   <button
//                     className="btn btn-primary btn"
//                     onClick={(e) => handleSubmit(e)}
//                   >
//                     Add Item
//                   </button>
//                 </form>

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
