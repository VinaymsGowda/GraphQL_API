const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    username:{
        required:true,
        unique:true,
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"admin",
    }
},{timestamps:true});

const AdminModel=mongoose.model('Admin',adminSchema);
module.exports = {AdminModel}; 