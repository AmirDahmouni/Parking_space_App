const carResolvers = require('../resolvers/car-resolvers')
const userResolvers=require("../resolvers/user-resolvers")
const parkingResolvers=require("../resolvers/parking-resolvers")
const bookingResolvers=require("../resolvers/booking-resolvers")
const {GraphQLObjectType,GraphQLString,GraphQLNonNull} = require('graphql')
const createCarInput=require("../types/typeInput/createCarInput")
const createUserInput=require("../types/typeInput/createUserInput")
const updateUserInput=require("../types/typeInput/updateUserInput")
const updateUserPasswordInput=require("../types/typeInput/updateUserPasswordInput")
const createBookingInput=require("../types/typeInput/createBookingInput")
const createParkingInput=require("../types/typeInput/createParkingInput")
const {SingleUserResponse,SingleCarResponse,SingleParkingResponse,SingleBookingResponse}=require("../types/responseType")

module.exports= new GraphQLObjectType({
    name: 'mutation',
    description: 'mutation query',
    fields: () => ({
        createCar: {
            type: SingleCarResponse,
            args: {
                createCarInput:{type:createCarInput}
            },
            resolve: carResolvers.createCar
        },
        createUser: {
            type:SingleUserResponse,
            args: {
                createUserInput:{type:createUserInput}
            },
            resolve: userResolvers.createUser
        },
        deleteUser: {
            type: SingleUserResponse,
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: userResolvers.deleteUser
        },
        deleteCar: {
            type: SingleCarResponse,
            args: {
                carid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: carResolvers.deleteCar
        },
        updateUser: {
            type: SingleUserResponse,
            args: {
               updateUserInput:{type:updateUserInput}
            },
            resolve: userResolvers.updateUser
        },
        updateUserByAdmin: {
            type: SingleUserResponse,
            args: {
               updateUserInput:{type:updateUserInput}
            },
            resolve: userResolvers.updateUserByAdmin
        },
        updateUserPassword: {
            type: SingleUserResponse,
            args: {
                updateUserPasswordInput:{type:updateUserPasswordInput}
            },
            resolve: userResolvers.updateUserPassword
        },
        createParking:{
            type:SingleParkingResponse,
            args:{
                createParkingInput:{type:createParkingInput}
            },
            resolve:parkingResolvers.createParking
        },
        deleteParking:{
            type:SingleParkingResponse,
            args:{
                parkingid:{ type: GraphQLNonNull(GraphQLString) }
            },
            resolve:parkingResolvers.deleteParking
        },
        createBooking:{
              type:SingleBookingResponse,
              args:{
                createBookingInput:{type:createBookingInput}
              },
              resolve:bookingResolvers.createBooking
        },
        deleteBooking:{
            type:SingleBookingResponse,
            args:{
                bookingid:{ type: GraphQLNonNull(GraphQLString) }
            },
            resolve:bookingResolvers.deleteBooking
        }
    })
})