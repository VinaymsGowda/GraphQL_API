const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema({
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
        default:"employee",
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    lastPasswordChange:{
        type:Date
    },
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employer",
        required:true
    }
},{
    timestamps:true,
});

const EmployeeModel=mongoose.model("Employee",employeeSchema);
module.exports={EmployeeModel};