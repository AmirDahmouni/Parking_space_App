import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gql from "graphql-tag";
import { useMutation,useQuery } from 'react-apollo';
import {CARS_LIST_SUCCESS,CAR_DELETED,CAR_ADDED} from "../constants/carConstants";
import {CREATE_CAR,DELET_CAR,CARS_LIST} from "../queries/Cars_Queries"

export default function CarsScreen()
{


    const [modalVisible, setModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [id, setId] = useState('');
    const [registration_number, setRegistration_number] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    
    const dispatch = useDispatch();
    const carsList=useSelector(state=>state.carsList);
    const {cars}=carsList

    const {loading,data,error}=useQuery(CARS_LIST,{
        onError:err=>console.log(err),
        onCompleted:(data)=>{
            if(data.Mycars.status==200)
            dispatch({type:CARS_LIST_SUCCESS,payload:data.Mycars.cars})
        }
    })

    const [createCar]=useMutation(CREATE_CAR,{variables:{
        registration_number,
        description,
        category,
        color,
        brand
    },
    onCompleted:(response)=>{
          if(response.createCar.status==201)
          {
            console.log(response)
            dispatch({type:CAR_ADDED,payload:response.createCar.car})
          }
    },
    onError:err=>console.log(err)

    })

    const [deleteCar]=useMutation(DELET_CAR)
    
    const openModal = (car) => {
        
            setId("")
            setModalVisible(true);
            setRegistration_number("")
            setDescription("")
            setCategory("")
            setBrand("")
            setColor("")
        
      };

    const submitHandler = async(e) => {
        e.preventDefault();
        createCar()
    };

    const deleteHandler = (car) => {
        
        deleteCar({variables:{carid:car._id}})
        dispatch({type:CAR_DELETED,payload:car._id})
    };

 return (
  <div className="content content-margined">
      <div className="product-header">
        <h3>My Cars</h3>
          <button className="button primary" onClick={() => openModal({})}>New Car</button>
  </div>
  {modalVisible && (
   <div className="form">
     <form onSubmit={submitHandler}>
       <ul className="form-container">
         <li>
           <h2>Create Car</h2>
         </li>
         <li>
           {loading && <div>Loading...</div>}
           {error && <div>{error}</div>}
         </li>

         <li>
           <label htmlFor="number">Registration number</label>
           <input
             type="text"
             name="number"
             value={registration_number}
             id="number"
             onChange={(e) => setRegistration_number(e.target.value)}
           ></input>
         </li>
         <li>
           <label htmlFor="address">brand</label>
           <input
             type="text"
             name="brand"
             value={brand}
             id="brand"
             onChange={(e) => setBrand(e.target.value)}
           ></input>
         </li>
         <li>
           <label htmlFor="description">Description</label>
           <input
             type="text"
             name="description"
             value={description}
             id="description"
             onChange={(e) => setDescription(e.target.value)}
           ></input>
         </li>
         
         <li>
           <label htmlFor="category">category</label>
           <input
             type="text"
             name="category"
             value={category}
             id="category"
             onChange={(e) => setCategory(e.target.value)}
           ></input>
         </li>
         
         <li>
           <label htmlFor="color">color</label>
           <input
             type="text"
             name="color"
             value={color}
             id="color"
             onChange={(e) => setColor(e.target.value)}
           ></input>
         </li>
        
         <li>
           <button type="submit" className="button primary">
             {id ? 'Update' : 'Create'}
           </button>
         </li>
         <li>
           <button
             type="button"
             onClick={() => setModalVisible(false)}
             className="button secondary"
           >
             Back
           </button>
         </li>
       </ul>
     </form>
   </div>
 )}

 <div className="product-list">
   <table className="table">
     <thead>
       <tr>
         <th>ID</th>
         <th>Registration number</th>
         <th>Brand</th>
         <th>Description</th>
         <th>Category</th>
         <th>Color</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       {cars && cars.map((car) => (
         <tr key={car._id}>
           <td>{car._id}</td>
           <td>{car.registration_number}</td>
           <td>{car.brand}</td>
           <td>{car.description}</td>
           <td>{car.category}</td>
           <td>{car.color}</td>
           <td>
             <button
               className="button"
               onClick={() => deleteHandler(car)}
             >
               Delete
             </button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
</div>)
}