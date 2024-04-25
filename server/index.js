const express=require("express");
const {ApolloServer}=require("@apollo/server");
const { graphql } = require("graphql");
const dotenv=require("dotenv").config();
const {merge}=require("lodash")
const { expressMiddleware } =require('@apollo/server/express4');
const { connection } = require("./configs/dbcon");
const { adminSchema } = require("./graphql/schemas/admin.js");
const { adminResolver } = require("./graphql/resolvers/admin.js");
const { EmployerSchema } = require("./graphql/schemas/employer.js");
const { EmployerResolver } = require("./graphql/resolvers/employer.js");
const { EmployeeSchema } = require("./graphql/schemas/employee.js");
const { EmployeeResolver } = require("./graphql/resolvers/employee.js");
const context=require("./configs/context.js");

const app=express();
const PORT=4000;

async function startServer(){
    app.use(express.json());
    const server=new ApolloServer({
        typeDefs:[adminSchema,EmployerSchema,EmployeeSchema],
        resolvers:merge(adminResolver,EmployerResolver,EmployeeResolver)
    })

    await server.start();

    app.use("/graphql",expressMiddleware(server,{
        context:context
    }));

    app.listen(PORT,()=>{
        console.log("Server Listening on PORT "+4000);
        console.log("Graphql Server started at http://localhost:4000/graphql")
        connection();
    })
}
startServer();