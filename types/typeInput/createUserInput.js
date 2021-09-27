const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')



module.exports = new GraphQLInputObjectType({
    name: 'createUserInput',
    fields: () => ({
        email: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        tel:{ type: GraphQLNonNull(GraphQLString) },
        type:{type: GraphQLNonNull(GraphQLString)},
        avatar:{type:GraphQLNonNull(GraphQLString)}
    })
})