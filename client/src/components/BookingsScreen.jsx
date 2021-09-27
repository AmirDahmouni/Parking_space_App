import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation,useQuery } from 'react-apollo';
import {BOOKINGS_LIST_SUCCESS,BOOKING_DELETED} from "../constants/bookingConstant"
import {DELET_BOOKING,BOOKINGS_LIST_ADMIN,BOOKING_LIST_CLIENT,BOOKING_LIST_RESPONSABLE} from "../queries/Bookings_Queries"
export default function ParkingsScreen()
{

    const dispatch = useDispatch();
    const bookingList=useSelector(state=>state.bookingList);
    const {bookings}=bookingList

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    //for admin
    const {loading,data,error}=useQuery(BOOKINGS_LIST_ADMIN,{
          onError:err=>console.log(err),
          onCompleted:(data)=>{
            if(data.getAllBookings.status==200)
            dispatch({type:BOOKINGS_LIST_SUCCESS,payload:data.getAllBookings.bookings})
            }
    })
    const [deleteBooking]=useMutation(DELET_BOOKING)
    const deleteHandler = (booking) => {  
       deleteBooking({variables:{bookingid:booking._id}})
        dispatch({type:BOOKING_DELETED,payload:booking._id})
    };

     //for client 
      
     const {loading:l,data:d,error:e}=useQuery(BOOKING_LIST_CLIENT,{
        onError:err=>console.log(err),
        onCompleted:(data)=>{
          if(data.mybookings.status==200)
          {
            dispatch({type:BOOKINGS_LIST_SUCCESS,payload:data.mybookings.bookings})
          }
        }
     })

     //for responsable
     
     const {loading:lp,error:errp}=useQuery(BOOKING_LIST_RESPONSABLE,{
       onCompleted:(data)=>{
        if(data.getMybookingsParkings.status==200)
        {
          dispatch({type:BOOKINGS_LIST_SUCCESS,payload:data.getMybookingsParkings.bookings})
        }
       }
     })


    return (<div className="content content-margined">
          <div className="product-header">
              <h3>Bookings</h3>
          </div>
          <div className="product-list">
    <table className="table">
     <thead>
       <tr>
         <th>ID</th>
         <th>description</th>
         <th>start</th>
         <th>end</th>
         <th>total price</th>
         <th>parking</th>
         <th>car</th>
         { (userInfo.type=="admin" || userInfo.type=="responsable") && <><th>username client</th> <th>Actions</th></>}
         
       </tr>
     </thead>
     <tbody>
       {bookings && bookings.map((booking) => (
         <tr key={booking._id}>
           <td>{booking._id}</td>
           <td>{booking.description}</td>
           <td>{booking.start}</td>
           <td>{booking.end}</td>
           <td>{booking.total_price}</td>
           <td>{booking.parking.name}</td>
           <td>{booking.car.registration_number}</td>
           {(userInfo.type=="admin" || userInfo.type=="responsable") &&
           <>
           <td>{booking.user.username}</td>
           <td>
             <button
               className="button"
               onClick={() => deleteHandler(booking)}
             >
               Delete
             </button>
           </td>
            </>
           }
         </tr>
       ))}
     </tbody>
   </table>
 </div>
</div>)
}