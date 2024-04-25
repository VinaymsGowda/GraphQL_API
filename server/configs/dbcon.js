const mongoose=require("mongoose");
const { AdminModel } = require("../models/admin");

const connection=()=>{
    mongoose.connect("mongodb://localhost:27017/Organization").then(async()=>{
        const admin=await AdminModel.findOne({username:"admin"});
        if(!admin){
            await AdminModel.create({
                username:"admin",
                password:"admin"
            })
        }
        console.log("Connected to Mongodb database");
    }).catch(()=>{
        console.log("Error Connection to database");
    })
}

module.exports={connection};