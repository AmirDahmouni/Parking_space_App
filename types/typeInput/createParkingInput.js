const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLID
} = require('graphql')


module.exports = new GraphQLInputObjectType({
    name: 'createParkingInput',
    fields: () => ({
        name:{type: GraphQLNonNull(GraphQLString)},
        description: { type: GraphQLNonNull(GraphQLString) },
        address:{type: GraphQLNonNull(GraphQLString)},
        images: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        capacity: { type: GraphQLNonNull(GraphQLInt) },
        responsable:{type: GraphQLNonNull(GraphQLID)}
    })
})
