const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLInt
} = require('graphql')
const GraphqlISODate  = require('graphql-iso-date');
const {GraphQLDateTime} = GraphqlISODate;

const ParkingType=require("./parkingType")
const CarType=require("./carType")
const UserType=require("./userType")
module.exports= new GraphQLObjectType({
    name: 'booking',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLNonNull(GraphQLString) },
        start:{type: GraphQLNonNull(GraphQLDateTime)},
        end:{type: GraphQLNonNull(GraphQLDateTime)},
        total_price:{ type: GraphQLNonNull(GraphQLFloat)},
        parking:{type:GraphQLNonNull(ParkingType)},
        car:{type:GraphQLNonNull(CarType)},
        user:{type:GraphQLNonNull(UserType)}
    })
})
