import gql from "graphql-tag";

export const DELET_BOOKING=gql`
mutation deleteBooking($bookingid:String!){
  deleteBooking(bookingid:$bookingid) {status booking {_id }}
}`;


export const BOOKINGS_LIST_ADMIN=gql`
query{
  getAllBookings{
                bookings {_id description start end total_price 
                            parking {name} 
                            car {registration_number} 
                            user {username}
                           } 
                  status
                }
}`;

export const BOOKING_LIST_CLIENT=gql`
query {
       mybookings {status 
                   bookings {
                             _id description start end total_price 
                             parking {name} 
                             car {registration_number brand } 
                             } 
                  }
}`;

export const BOOKING_LIST_RESPONSABLE=gql`query {
    getMybookingsParkings {
                           bookings { _id description total_price start end  user {username} 
                                      car {registration_number} 
                                      parking {name}
                                    } 
                           status 
                          }
}`;

export const BOOKING_PARKING=gql`
mutation createBooking($description:String! $parking:ID! $car:ID! $price:Int! $start:DateTime! $end:DateTime!)
{
     createBooking(createBookingInput:{
        description:$description,
        start:$start,
        end:$end,
        total_price:$price,
        parking:$parking,
        car:$car
     })
     {
         error
     }
}`;