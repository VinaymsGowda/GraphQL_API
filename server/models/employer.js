const mongoose=require("mongoose");

const employerSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        type:String,
        default:"employer",
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    lastPasswordChange:{
        type:Date
    }
},{
    timestamps:true,
})

const EmployerModel=mongoose.model("Employer",employerSchema);
module.exports={EmployerModel};