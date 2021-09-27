const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')



module.exports = new GraphQLInputObjectType({
    name: 'updateUserPasswordInput',
    fields: () => ({
        oldpassword: { type: GraphQLNonNull(GraphQLString) },
        newpassword: { type: GraphQLNonNull(GraphQLString) }
    })
})