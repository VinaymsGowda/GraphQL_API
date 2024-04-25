const jwt=require("jsonwebtoken");
const { AdminModel } = require("../models/admin");
const { EmployerModel } = require("../models/employer");
const { EmployeeModel } = require("../models/employee");

const verifyToken=(token)=>{
    return jwt.verify(
        token,process.env.JWT_SECRET
    )
}
const Adminauth=async(token)=>{
    if(!token){
        throw new Error("Token is Not provided ")
    }
    try {
       const decode=verifyToken(token);
       
       const checkUser=await AdminModel.findById(decode.id);
    //    console.log("User found "+JSON.stringify(checkUser));
       if(!checkUser)
        return null;
      return checkUser;
    } catch (error) {
        console.log(error.message);
        return null;
    }
    
}

const EmployerAuth=async(token)=>{
    if(!token){
        throw new Error("Token is Not provided ")
    }
    try {
        const decode=verifyToken(token);
        // console.log(decode);
        const checkUser=await EmployerModel.findById(decode.id);
        if(!checkUser)
            return null;
        return checkUser;
    } catch (error) {
        return null;
        console.log(error.message);
    }
}

const EmployeeAuth=async(token)=>{
    if(!token){
        throw new Error("Token is Not provided ")
    }
    try {
        const decode=verifyToken(token);
        // console.log(decode);
        const checkUser=await EmployeeModel.findById(decode.id);
        if(!checkUser)
            return null;
        return checkUser;
    } catch (error) {
        return null;
        console.log(error.message);
    }

}


const checkPasswordAuth=async(object,role)=>{
    const {email,oldPassword,newPassword}=object;
    try {
        if(role=="employer"){
            var checkUser=await EmployerModel.findOne({email});
        }
        if(role=="employee"){
            var checkUser=await EmployeeModel.findOne({email});   
        }
        if(!checkUser){
            return null;
        }
        // compare old password with matched user password
        if(checkUser.password==oldPassword){
            //matched now change to new password
            return checkUser;
        }
        else{
            throw new Error("Old Password doesnt match with provided password")
        }
        
    } catch (error) {
        throw new Error(error.message)
        return null;
    }
}

module.exports={Adminauth,EmployerAuth,EmployeeAuth,checkPasswordAuth};