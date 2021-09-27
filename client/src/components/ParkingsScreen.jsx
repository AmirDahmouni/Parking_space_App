import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gql from "graphql-tag";
import { useMutation,useQuery } from 'react-apollo';
import axios from 'axios';
import {RESPONSABLES_LIST_SUCCESS} from "../constants/userConstants";
import {PARKING_ADDED,PARKING_DELETED,PARKING_LIST_SUCCESS,
  PARKING_ADMIN_LIST_REQUEST,PARKING_ADMIN_LIST_SUCCESS,PARKING_ADMIN_LIST_FAIL,
  PARKING_ADMIN_DELETED,PARKING_ADMIN_ADDED} from "../constants/parkingConstants"
  
import {CREATE_PARKING,DELET_PARKING,PARKINGS_LIST_ADMIN} from "../queries/Parkings_Queries"
import {LAZY_RESPONSABLES} from "../queries/User_Queries"
import {PARKING_LIST_RESPONSABLE} from "../queries/Parkings_Queries"

export default function ParkingsScreen()
{

    const [modalVisible, setModalVisible] = useState(false);
    const [parkingID,setParkingID]=useState()
    const [uploading, setUploading] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [responsable,setResponsable]=useState()
    const [responsables,setResponsables]=useState([])
    const dispatch = useDispatch();
    const parkingList=useSelector(state=>state.parkingList);
    const {parkingsAdmin}=parkingList

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    
    

    const {data:datares}=useQuery(LAZY_RESPONSABLES,{
        onCompleted:(response)=>{
            if(response.LazyResponsables.status==200)
            {
              setResponsables(response.LazyResponsables.users)
              if(response.LazyResponsables.users.length>0)
              setResponsable(response.LazyResponsables.users[0]._id)
            }
        }
    })

    const {loading,data,error}=useQuery(PARKINGS_LIST_ADMIN,{
        onError:err=>console.log(err),
        onCompleted:(data)=>{
            if(data.parkings.status==200)
            dispatch({type:PARKING_ADMIN_LIST_SUCCESS,payload:data.parkings.parkings})
        }
    })

    const {loading:loadingParkings,error:errorParkings}=useQuery(PARKING_LIST_RESPONSABLE,{
        
        onError:err=>console.log(err),
        onCompleted:(data)=>{
            if(data.myParkings.status==200)
            dispatch({type:PARKING_ADMIN_LIST_SUCCESS,payload:data.myParkings.parkings})
        }
    })
    

    const [createParking]=useMutation(CREATE_PARKING,{
      
      variables:{
        price,
        capacity,
        responsable,
        name,
        description,
        address,
        images
    },
    onCompleted:(response)=>{
          if(response.createParking.status==201)
          {
            dispatch({type:PARKING_ADMIN_ADDED,payload:response.createParking.parking})
          }
    },
    onError:err=>console.log(err.name,err.networkError,err.stack)

    })

    const [deleteParking]=useMutation(DELET_PARKING)
    
    const openModal = (parking) => {
        if(parking._id)
        {
          setId(parking._id)
          setModalVisible(true);
          setName(parking.name)
          setAddress(parking.address)
          setDescription(parking.description)
          setPrice(parking.price)
          setCapacity(parking.capacity)
          setResponsable(parking.responsable)
        }
        else{
            setId("")
            setModalVisible(true);
            setName("")
            setAddress("")
            setDescription("")
            setPrice()
            setCapacity()
            setResponsable()
        } 
      };

    const uploadFileHandler = (e) => {
    
        const files=e.target.files;
        const bodyFormData = new FormData();
        
        for(let i=0;i<files.length;i++)
        {
          bodyFormData.append(`Image${i}`,files[i])
        }
        
        setUploading(true)
        var newimages=[]
        bodyFormData.forEach(image=>{
          let formData=new FormData()
          formData.append('Image',image)
          
          axios.post('http://localhost:5000/api/uploads/s3',formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            
            newimages.push(response.data)
            console.log(response.data)
            
            
            setUploading(false);
          })
          .catch((err) => {
            console.log("error");
            setUploading(false);
          });
        })
        setImages(newimages);
        console.log(images)  
      };

    const submitHandler =(e) => {
        e.preventDefault();
       
        createParking()
        //dispatch({type:PARKING_ADDED,payload:parking._id})
      };

    const deleteHandler = (parking) => {
        console.log(parking._id)
        deleteParking({variables:{parkingid:parking._id}})
        dispatch({type:PARKING_ADMIN_DELETED,payload:parking._id})
      };


     


 return (<div className="content content-margined">
    <div className="product-header">
      <h3>Parkings</h3>
        { userInfo.type=="admin" && (<button className="button primary" onClick={() => openModal({})}>
              Create Parking
          </button>) }
    </div>
    {modalVisible && (
      <div className="form">
     <form onSubmit={submitHandler}>
       <ul className="form-container">
         <li>
           <h2>Create Parking</h2>
         </li>
         
         <li>
           {loading && <div>Loading...</div>}
           {error && <div>{error}</div>}
         </li>

         <li>
           <label htmlFor="name">Name</label>
           <input
             type="text"
             name="name"
             value={name}
             id="name"
             onChange={(e) => setName(e.target.value)}
           ></input>
         </li>
         <li>
           <label htmlFor="address">Address</label>
           <input
             type="text"
             name="address"
             value={address}
             id="address"
             onChange={(e) => setAddress(e.target.value)}
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
           <label htmlFor="images">images</label>
           <input
             type="text"
             name="images"
             value={images}
             id="images"
             onChange={(e) => setImages(e.target.value)}
           ></input>
           <input type="file" multiple onChange={uploadFileHandler}></input>
           {uploading && <div>Uploading...</div>}
         </li>
         <li>
           <label htmlFor="Capacity">Capacity</label>
           <input
             type="number"
             name="Capacity"
             value={capacity}
             id="Capacity"
             onChange={(e) => setCapacity(e.target.value)}
           ></input>
         </li>
         <li>
           <label htmlFor="Price">Price</label>
           <input
             type="number"
             name="Price"
             value={price}
             id="Price"
             onChange={(e) => setPrice(e.target.value)}
           ></input>
         </li>
         <li>
             Responsable
             <select
               value={responsable}
               onChange={(e) => {setResponsable(e.target.value)}}>
               {
                   responsables.map(responsable=><option value={responsable._id}>{responsable.username}</option>)
               }
               {
                 responsables.length==0 && <option value='0'>No responsable Lazy</option>
               }
             </select>
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
    {parkingID && (
        <div className="product-list">
     <h3>Cars</h3>
     <button className="button primary" onClick={() => setParkingID(null)} style={{margin:"10px"}}>Back</button>
     <table className="table">
      <thead>
        <tr>
        <th>registration_number</th>
        <th>brand</th>
        <th>color</th>
        <th>owner</th>
        <th>name</th>
        <th>email</th>
        <th>tel</th>
        <th>avatar</th>
        </tr>
      </thead>
      <tbody>
      { userInfo.type=="responsable" && 
         (parkingsAdmin.find(parking=>parking._id==parkingID).cars.map(car=>
          <tr>
          <td>{car.registration_number}</td>
          <td>{car.brand}</td>
          <td>{car.color}</td>
          <td>{car.owner.username}</td>
          <td>{car.owner.name}</td>
          <td>{car.owner.email}</td>
          <td>{car.owner.tel}</td>
          <td>{car.owner.avatar}</td>
        </tr>
         ))
      }
      </tbody>
      </table>
    </div>
    )}
    <div className="product-list">
   <table className="table">
     <thead>
       <tr>
         <th>ID</th>
         <th>Name</th>
         <th>Address</th>
         <th>Description</th>
         <th>capacity</th>
         <th>price/H</th>
         <th>places avaible</th>
         {userInfo.type=="responsable" && (<th>Cars</th>)}
         {userInfo.type=="admin" && (<th>responsable</th>)}
       </tr>
     </thead>
     <tbody>
       {parkingsAdmin && parkingsAdmin.map((parking) => (
         <tr key={parking._id}>
           <td>{parking._id}</td>
           <td>{parking.name}</td>
           <td>{parking.address}</td>
           <td>{parking.description}</td>
           <td>{parking.capacity}</td>
           <td>{parking.price}</td>
           <td>{parking.nb_places_avaible}</td>
           {userInfo.type=="admin" && (<td>{parking.responsable.username}</td>)}
           {userInfo.type=="responsable" && (<td><button
               className="button"
               onClick={()=>setParkingID(parking._id)}>
               Display
             </button></td>)}
         </tr>
       ))}
     </tbody>
   </table>
 </div>
    </div>
  )
}