const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql')

module.exports=new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        tel:{ type: GraphQLNonNull(GraphQLString) },
        type:{ type: GraphQLNonNull(GraphQLString) },
        avatar:{type: GraphQLNonNull(GraphQLString)}
    })
})
