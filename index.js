const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload')
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const QuerySchema = require('./schema/QuerySchema')
const MutationSchema=require("./schema/MutationSchema")
const Auth=require("./middleware/Auth")
const {uploadRoute}=require('./resolvers/files-resolvers');
require('dotenv').config()
const cors = require('cors')

 

console.log(process.env.DB_HOST)
mongoose.connect(process.env.DB_HOST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})


app.use(cors())
app.use(fileUpload({useTempFiles: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/uploads/', uploadRoute);
app.use('/graphql',Auth,graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
        query: QuerySchema,
        mutation: MutationSchema
    })
    
}))
app.listen(process.env.PORT,()=>console.log(`listen on port ${process.env.PORT}`))



module.exports = app;