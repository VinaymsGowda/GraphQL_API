const { generateToken } = require("../configs/auth");
const { isPasswordExpired } = require("../middlewares/passwordExpiry");
const { EmployerModel } = require("../models/employer");
const {EmployeeModel}=require("../models/employee")

async function getEmployers(parent,args,{req,Adminauth}){
    // console.log(req.headers.token);
    const user=await Adminauth(req.headers.token);
    // console.log(user);
    if(user){
        return await EmployerModel.find();
    }
    else{
        throw new Error("Not Authorized");
    }
    
}

async function getEmployerById(parent,args,{req,Adminauth,EmployerAuth}){
    // console.log(args);
    try {
        //check who is doing query with help of token provided
        const isAdmin=await Adminauth(req.headers.token);
        // console.log("Admin?"+isAdmin);
        const isEmployer=await EmployerAuth(req.headers.token);
        // console.log("EMployer?"+isEmployer);
        if(isAdmin || isEmployer._id==args.id){
            //do the query
            return await EmployerModel.findById(args.id);
        }
        else{
            throw new Error("Authorization Failed");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addEmployer(parent,args,{req,Adminauth}){
    // console.log(args);
    try {
        const user=await Adminauth(req.headers.token);
        if(user){
            const employer=await EmployerModel.findOne({
                $or:[
                    {email:args.employer.email},
                    {username:args.employer.username}
                ]
            });
            if(employer){
                throw new Error("An Employee with similar username or email already exists")
            }
            const newEmployer=await EmployerModel.create({
                ...args.employer,
                lastPasswordChange:Date.now()
            })
            return newEmployer;  
        } 
        else throw new Error("You are not authorized to perform this action");
    } catch (error) {
        throw new Error(error.message)
    }
    
}

async function EmployerLogin(parent,args){
    // console.log(args.employer);

    try {
        const {username,password}=args.employer;
        
        const checkUser=await EmployerModel.findOne({username:username});
        if(checkUser){
            // if there is a user then check for password expiry
            const flag=isPasswordExpired(checkUser);
            if(!flag){
                if(password==checkUser.password){
                    return {
                        _id:checkUser._id,
                        username:checkUser.username,
                        role:checkUser.role,
                        email:checkUser.email,
                        phoneNumber:checkUser.phoneNumber,
                        address:checkUser.address,
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
                throw new Error("Password Expired please reset");
            }
        }
        else{
            throw new Error("Wrong Username doesnt exist in database");
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

async function updateEmployerName(parent,args,{req,Adminauth}){
    // console.log(args);
    try {
        const isAdmin=await Adminauth(req.headers.token);
        if(isAdmin){
            let employer = await EmployerModel.findById(args.id);
            if(!employer){
                throw new Error('Invalid Id Doesnt Exist');
            }
            let updatedEmployee = await EmployerModel.updateOne({
                _id: args.id
            },{
              username:args.username
            })
            return await EmployerModel.findById(args.id);
        }
        else{
            throw new Error("You are not an Admin");
        }
        
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteEmployer(parent,args,{req,Adminauth}){
    // console.log(args);

    try {
        const isAdmin=await Adminauth(req.headers.token);
        if(isAdmin){
            const user=await EmployerModel.findByIdAndDelete(args.id);
            console.log(user);
            if(user){
                //delete employees under employer
                console.log("hi");
                const employees=await EmployeeModel.deleteMany({
                    employer:args.id
                })
                console.log(employees);
                return {
                    message:"Deleted Employer and the employees under the Employer"
                }
            }
            else{
                throw new Error("Provided Employer id doesnt exist");
            }
            
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

async function updatePassword(parent,args,{req,checkPasswordAuth}){
    try {
        const isEmployer= await checkPasswordAuth(args,"employer");
        console.log(isEmployer);
        if(isEmployer){
            const updateData=await EmployerModel.findOneAndUpdate({
                email:args.email
            },{
                password:args.newPassword,
                lastPasswordChange:Date.now()
            });
            if(updateData){
                return {
                    message:"Employer Password Updated Successfully"
                }
            }
        }
        else{
            throw new Error("Authorization failed");
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={addEmployer,getEmployers,EmployerLogin,getEmployerById,updateEmployerName,deleteEmployer,updatePassword};