const carResolvers = require('../resolvers/car-resolvers')
const userResolvers=require("../resolvers/user-resolvers")
const parkingResolvers=require("../resolvers/parking-resolvers")
const bookingResolvers=require("../resolvers/booking-resolvers")

const {GraphQLObjectType,GraphQLNonNull,GraphQLID} = require('graphql')

const {
    UserLoginResponse,SingleUserResponse,MultiUserResponse,
    SingleCarResponse,MultiCarResponse ,MultiParkingResponse,SingleParkingResponse,
    SingleBookingResponse,MultiBookingResponse
}=require("../types/responseType")

const loginUserInput=require("../types/typeInput/loginUserInput")



module.exports = new GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: () => ({
        Mycars: {
            type: MultiCarResponse,
            resolve: carResolvers.getMyCars
        },
        car: {
            type: SingleCarResponse,
            args: {
                carid: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: carResolvers.getCar
        },
        MyCarsnotParked:{
            type:MultiCarResponse,
            resolve:carResolvers.getMyCarsnotParked
        },
        users: {
            type: MultiUserResponse,
            resolve: userResolvers.getUsers
        },
        user: {
            type: SingleUserResponse,
            args: {
                userid: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: userResolvers.getUser
        },
        login: {
            type: UserLoginResponse,
            args: {
                loginUserInput:{type:loginUserInput}
            },
            resolve: userResolvers.userLogin
        },
        parking:{
            type:SingleParkingResponse,
            args:{
                parkingid:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve: parkingResolvers.getParking
        },
        parkings:{
            type:MultiParkingResponse,
            resolve: parkingResolvers.getParkings
        },
        myParkings:{
            type:MultiParkingResponse,
            resolve: parkingResolvers.getMyParkings
        },
        booking:{
            type:SingleBookingResponse,
            args:{
                bookingid:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve:bookingResolvers.getBooking
        },
        getAllBookings:{
            type:MultiBookingResponse,
            resolve:bookingResolvers.getAllBookings
        },
        mybookings:{
            type:MultiBookingResponse,
            resolve:bookingResolvers.getMyBookings
        },
        getMybookingsParkings:{
            type:MultiBookingResponse,
            resolve:bookingResolvers.getMybookingsParkings
        },
        LazyResponsables:{
            type:MultiUserResponse,
            resolve:userResolvers.getLazyResposables
        }
    })
})






