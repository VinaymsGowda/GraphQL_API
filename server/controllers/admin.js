const { generateToken } = require("../configs/auth");
const { AdminModel } = require("../models/admin");

async function Login(parent,args){
    // console.log(args);
    const {admin}=args;
    if(!admin.username || !admin.password)
    throw new Error("Enter all fields");
    // console.log(admin);
    const checkUser=await AdminModel.findOne({username:admin.username});
    if(checkUser){
        if(checkUser.password==admin.password){
            return {
                username:checkUser.username,
                role:checkUser.role,
                _id:checkUser._id,
                token:generateToken({
                    role:checkUser.role,
                    id:checkUser._id
                })
            }
        }
        else{
            throw new Error("Wrong Password")
        }
    }
    else{
        throw new Error("Wrong Username");
    }
}

module.exports={Login};