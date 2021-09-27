
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
} = require('graphql')

const UserType=require("../types/type/userType")
const CarType=require("../types/type/carType")
const ParkingType=require("../types/type/parkingType")
const BookingType=require("../types/type/bookingType")

const SingleUserResponse = new GraphQLObjectType({
    name: 'SingleUserResponse',
    fields: () => ({
        status: { type: GraphQLNonNull(GraphQLInt) },
        user: { type: UserType },
        error:{type:GraphQLString},
        message:{type:GraphQLString}
    })
})
const MultiUserResponse=new GraphQLObjectType({
    name:"MultiUserResponse",
    fields:()=>({
        status:{type:GraphQLNonNull(GraphQLInt)},
        users:{type:GraphQLList(UserType)},
        error:{type:GraphQLString}
    })
})
const UserLoginResponse = new GraphQLObjectType({
    name: 'UserLoginResponse',
    fields: () => ({
        status:{type:GraphQLNonNull(GraphQLInt)},
        user: { type: UserType },
        token: { type: GraphQLString },
        error:{type:GraphQLString}
    })
})
const SingleCarResponse=new GraphQLObjectType({
    name: 'SingleCarResponse',
    fields: () => ({
        status:{type:GraphQLNonNull(GraphQLInt)},
        car: { type: CarType },
        error:{type:GraphQLString}
    })
})

const MultiCarResponse=new GraphQLObjectType({
    name: 'MultiCarResponse',
    fields: () => ({
        status:{type:GraphQLNonNull(GraphQLInt)},
        cars: { type:GraphQLList(CarType) },
        error:{type:GraphQLString}
        
    })
})

const SingleParkingResponse = new GraphQLObjectType({
    name: 'SingleParkingResponse',
    fields: () => ({
        status: { type: GraphQLNonNull(GraphQLInt) },
        parking: { type: ParkingType },
        error:{type:GraphQLString},
        message:{type:GraphQLString}
    })
})
const MultiParkingResponse=new GraphQLObjectType({
    name:"MultiParkingResponse",
    fields:()=>({
        status:{type:GraphQLNonNull(GraphQLInt)},
        parkings:{type:GraphQLList(ParkingType)},
        error:{type:GraphQLString}
    })
})



const SingleBookingResponse=new GraphQLObjectType({
    name:"SingleBookingResponse",
    fields:()=>({
        status:{type:GraphQLNonNull(GraphQLInt)},
        booking:{type:BookingType},
        error:{type:GraphQLString}
    })
})

const MultiBookingResponse=new GraphQLObjectType({
    name:"MultiBookingResponse",
    fields:()=>({
        status:{type:GraphQLNonNull(GraphQLInt)},
        bookings:{type:GraphQLList(BookingType)},
        error:{type:GraphQLString}
    })
})


module.exports={
    SingleUserResponse,
    MultiUserResponse,
    UserLoginResponse,
    SingleCarResponse,
    MultiCarResponse,
    SingleParkingResponse,
    MultiParkingResponse,
    SingleBookingResponse,
    MultiBookingResponse
}

