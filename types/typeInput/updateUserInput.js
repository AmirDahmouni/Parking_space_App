const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')


module.exports = new GraphQLInputObjectType({
    name: 'updateUserInput',
    fields: () => ({
         id:{type:GraphQLString},
         username: { type: GraphQLNonNull(GraphQLString) },
         name: { type: GraphQLNonNull(GraphQLString) },
         email: { type: GraphQLNonNull(GraphQLString) },
         tel:{ type:GraphQLNonNull(GraphQLString)},
         avatar:{type:GraphQLString}
    })
})