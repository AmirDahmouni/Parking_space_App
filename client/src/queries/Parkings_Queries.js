import gql from "graphql-tag";

export const LIST_PARKINGS=gql`
query {
    parkings
    { status
        parkings { _id name images description address price capacity nb_places_avaible responsable{username tel avatar}}
    }
}`;

export const PARKING_DETAILS=gql`
query parking($parkingid:ID!)
{
   parking(parkingid:$parkingid)
    { 
        error 
        status 
        parking 
        {
             _id description images address price capacity nb_places_avaible name 
              responsable 
              {
                  name 
                  tel 
                  avatar
              }
        } 
    }
}`;

export const CREATE_PARKING=gql`
mutation createParking($name:String! $responsable:ID! $description:String! $address:String! 
      $images:[String]!)
{
  createParking(createParkingInput:{
    name:$name,
    description:$description,
    price:2,
    address:$address,
    images:$images,
    capacity:50,
    responsable:$responsable
    })
    {
        parking 
        {  _id name address price nb_places_avaible description capacity 
           responsable 
           {
               username
           } 
        }
        error 
        status
    }
}`;
export const DELET_PARKING=gql`
mutation deleteParking($parkingid:String!){
    deleteParking(parkingid:$parkingid) 
    { 
      status 
      parking {_id images}
    }
}`;

export const PARKINGS_LIST_ADMIN=gql`
query{
    parkings {
        status 
        parkings {_id description nb_places_avaible name address responsable {username} price capacity}}
}`;

export const PARKING_LIST_RESPONSABLE=gql`
query {
   myParkings 
   {  status 
      parkings {_id name  price description address capacity nb_places_avaible 
                  cars 
                  { _id brand color registration_number 
                     owner 
                     {
                         username email name tel avatar
                     }  
                  } 
                }
    }
}`;


