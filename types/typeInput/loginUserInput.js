const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')



module.exports = new GraphQLInputObjectType({
    name: 'loginUserInput',
    fields: () => ({
            email: { type: GraphQLNonNull(GraphQLString) },
            password: { type: GraphQLNonNull(GraphQLString) }
    })
})