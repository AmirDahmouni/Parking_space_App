const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLInt
} = require('graphql')
const CarType=require("../type/carType")
const UserType=require("../type/userType")

module.exports=new GraphQLObjectType({
    name: 'parking',
    fields: () => ({
        _id:{ type: GraphQLNonNull(GraphQLID)},
        name:{ type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        price:{type: GraphQLNonNull(GraphQLFloat)},
        address: { type: GraphQLNonNull(GraphQLString)},
        images: { type: GraphQLNonNull(GraphQLList(GraphQLString))},
        capacity:{type:GraphQLNonNull(GraphQLInt)},
        nb_places_avaible:{type:GraphQLNonNull(GraphQLInt)},
        cars:{type:GraphQLNonNull(GraphQLList(CarType))},
        responsable:{type:GraphQLNonNull(UserType)}
    })
})
