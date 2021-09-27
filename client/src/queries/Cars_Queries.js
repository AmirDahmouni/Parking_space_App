import gql from "graphql-tag";

export const CREATE_CAR=gql`
    mutation createCar($registration_number:String! $brand:String! $description:String! $category:String!
    $color:String!)
    {
      createCar(createCarInput:{
      registration_number:$registration_number,
      brand:$brand,
      description:$description,
      category:$category,
      color:$color
  })
  {
     error  
     status 
     car {_id registration_number brand description category color}
  }
}`;

export const DELET_CAR=gql`
mutation deleteCar($carid:String!){
    deleteCar(carid:$carid) 
    {
      status 
      car {_id }
    }
}`;

export const CARS_LIST=gql`
query{
  Mycars 
  {
     cars {_id registration_number brand description category color} 
     status 
  }
}`;

export const MY_CARS_LIST=gql`
  query 
  {
       MyCarsnotParked 
       { 
         status 
         cars { _id brand registration_number category } 
       }
}`;