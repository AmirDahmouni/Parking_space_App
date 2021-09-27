const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
} = require('graphql')


module.exports = new GraphQLInputObjectType({
    name: 'createCarInput',
    fields: () => ({
        registration_number:{type: GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        category: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) }
    })
})