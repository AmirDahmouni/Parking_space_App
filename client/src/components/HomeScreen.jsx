
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import {PARKING_LIST_SUCCESS,PARKING_LIST_FAIL,PARKING_DETAILS_SUCCESS} from "../constants/parkingConstants"
import {LIST_PARKINGS} from "../queries/Parkings_Queries"


export default function HomesScreen(props)
{

    const parkingList = useSelector((state) => state.parkingList);
    const { parkings} = parkingList;
    const dispatch = useDispatch();
     
    
    const {loading, error, data}=useQuery(LIST_PARKINGS,{
      onCompleted:(data)=>{
         if(data.parkings.status==200)
          dispatch({type:PARKING_LIST_SUCCESS,payload:data.parkings.parkings})
         /*else 
          dispatch({type:PARKING_LIST_FAIL,payload:data.parkings.error})*/
      }
    })

   return (<> 
        
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <ul className="products">
        {parkings &&  parkings.map((parking) => (
          <li key={parking._id}>
            <div className="product" >
              <Link to={`/parking/${parking._id}`}>
                <img
                  className="product-image"
                  src={parking.images[0]}
                  alt="parking"
                />
              </Link>
              <div className="product-name" >
                <Link  to={`/parking/${parking._id}`} >{parking.name}</Link>
              </div>
              <div className="product-brand">Capacity {parking.capacity}</div>
              <div className="product-brand">Tel Responsable :{parking.responsable.username} {parking.responsable.tel}</div>
              <div className="product-price">${parking.price}/Hour</div>
            </div>
          </li>
        ))}
      </ul>
      
    )} 
  </>)



}