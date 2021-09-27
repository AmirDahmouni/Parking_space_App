import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import gql from "graphql-tag";
import { useQuery,useLazyQuery, useMutation} from 'react-apollo';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {PARKING_DETAILS_FAILED,PARKING_DETAILS_SUCCESS} from "../constants/parkingConstants"
import Image from 'react-image-resizer';
import DateTimePicker from 'react-datetime-picker';
import {PARKING_DETAILS} from "../queries/Parkings_Queries"
import {BOOKING_PARKING} from "../queries/Bookings_Queries"
import {MY_CARS_LIST} from "../queries/Cars_Queries"

export default function ParkingScreen (props)
{

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [Car,setCar]=useState()
    const [now,setNow]=useState(new Date());
    const [future,setFuture]=useState(new Date());
    const [description,setDescription]=useState()
    const [Cars,setCars]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const parkingList = useSelector((state) => state.parkingList);
    const { parking,error} = parkingList;
    const dispatch = useDispatch();

    

    const [getParkingDetails]=useLazyQuery(PARKING_DETAILS,{
    onCompleted:(data)=>{
        if(data.parking.status==200)
          dispatch({type:PARKING_DETAILS_SUCCESS,payload:data.parking.parking})
        else dispatch({type:PARKING_DETAILS_FAILED,payload:data.parking.error})
     }
    })

    const [createBook]=useMutation(BOOKING_PARKING,{
      onCompleted:(response)=>{
        props.history.push("/bookings")
      }
    })
    
    const {loading,data}=useQuery(MY_CARS_LIST,{
        onError:err=>console.log(err),
        onCompleted:(data)=>{
           console.log(data)
           if(data.MyCarsnotParked.status==200)
           {
            setCars(data.MyCarsnotParked.cars)
            if(data.MyCarsnotParked.cars.length>0)
            setCar(data.MyCarsnotParked.cars[0]._id)
           }

        }
    })

 

    const difference=(dateNow,dateFuture)=>{
        var seconds = Math.floor((dateFuture - (dateNow))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        

        return minutes+(hours*60)+(days*24*60);
    }
    useEffect(()=>{
      if(parking)
      {
        let minutes=difference(now,future)
        setTotalPrice(Math.round(parking.price/60*minutes))
      }
    
    },[now,future])

    const handleBook=()=>{
      if(!totalPrice || !description)
      {
        console.log("two dates similar")
      }
      else
      {
        if(userInfo)
        {
         createBook({variables:{
            description:description,
            parking:props.match.params.id,
            car:Car,
            price:totalPrice,
            start:now.toISOString(),
            end:future.toISOString()
          }})
        }
        else props.history.push("/signin")
     }
    }

    
    useEffect(()=>{
        getParkingDetails({variables:{parkingid:props.match.params.id}}) 
        
    },[])
   
    
   if(!parking) return (<div>Loading...</div>)
   if(error) return (<div>{error} </div>)
    return (
        (parking)&&
        (<div>
        <div className="back-to-result">
          <Link to="/">Back to result</Link>
        </div>
            <div className="details">
            <Carousel width="400px">
              {(parking.images) && (
                parking.images.map(image=>
                  <div>
                  <img src={image} alt="product"/>
                  </div>
                  )
              )
              }
              </Carousel>
              <div className="details-info" style={{padding:"20px"}}>
                <ul>
                  <li>
                    <h4>Name :{parking.name}</h4>
                  </li>
                  
                  <li>
                    Price: <b>${parking.price} /Hour</b>
                  </li>
                  
                  <li>
                    Description:
                    <b>{parking.description}</b>
                  </li>
                  <li>
                     Capacity <b>{parking.capacity}</b>
                  </li>
                  <li>
                    Address <b>{parking.address}</b>
                  </li>
                  {(parking.responsable) &&(<li>
                    Responsable <b>{parking.responsable.name} </b>
                    <Image src={parking.responsable.avatar} height={130} width={150}/>
                    <div>
                    telephone <b>{parking.responsable.tel}</b>
                    </div>
                  </li>)}
                  
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>Price: {totalPrice}</li>
                  {userInfo && (userInfo.type!=="admin" && userInfo.type!=="responsable" ) && (<li>
                  Car:{' '}
                  <select value={Car} onChange={(e) => {setCar(e.target.value)}}>
                      {(Cars) && Cars.map(car=><option key={car._id} value={car._id}>{car.registration_number}-{car.brand}</option>)}
                  </select>
                 </li>)}
                  
                  <li>
                    Status:{' '}
                    {parking.nb_places_avaible!==0 ? 'available places' : 'Unavailable place'}
                  </li>
                  <li>
                      From
                  <DateTimePicker onChange={setNow} value={now}/>
                  To
                  <DateTimePicker onChange={setFuture}  value={future}/>
                  </li>
                  <li>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)}/>
                  </li>
                  <li>
                    {parking.capacity!==parking.nb_places_avaible > 0 && (Car) && (
                      <button
                        onClick={handleBook}
                        className="button primary"
                      >
                        Booking
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
      </div>))
}