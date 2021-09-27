const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} = require('graphql')
const GraphqlISODate  = require('graphql-iso-date');
const {GraphQLDateTime} = GraphqlISODate;

module.exports= new GraphQLInputObjectType({
    name: 'createBookingInput',
    fields: () => ({
        description: { type: GraphQLNonNull(GraphQLString) },
        start:{type: GraphQLNonNull(GraphQLDateTime)},
        end:{type: GraphQLNonNull(GraphQLDateTime)},
        total_price:{ type: GraphQLNonNull(GraphQLInt)},
        parking:{type:GraphQLNonNull(GraphQLID)},
        car:{type:GraphQLNonNull(GraphQLID)},
    })
})