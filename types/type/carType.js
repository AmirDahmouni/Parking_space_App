const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql')

const UserType=require("./userType")
module.exports= new GraphQLObjectType({
    name: 'car',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        registration_number:{type: GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        category: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
        owner: { type: GraphQLNonNull(UserType) }

    })
})
