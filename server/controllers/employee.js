const { generateToken } = require("../configs/auth");
const { isPasswordExpired } = require("../middlewares/passwordExpiry");
const { EmployeeModel } = require("../models/employee");

async function addEmployee(parent,args,{req,Adminauth,EmployerAuth}){
    // console.log(args);
    try {
        // console.log(req.headers.token);
        //apply auth TODO admin and employer can add new employees
        const isAdmin=await Adminauth(req.headers.token);
        const isEmployer=await EmployerAuth(req.headers.token);
        if(isAdmin || isEmployer){
        const newEmployee=await EmployeeModel.create({
            ...args.employee,
            lastPasswordChange:Date.now()
        })
        return newEmployee;
    }
    else{
        throw new Error("You are not Authorized to create a new EMployee")
    }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getEmployees(parent,args,{req,Adminauth,EmployerAuth}){
    try {
        const isAdmin=await Adminauth(req.headers.token);
        const isEmployer=await EmployerAuth(req.headers.token);
        if(isAdmin || isEmployer){
            return await EmployeeModel.find().sort({username:1});
        }
        else{
           throw new Error("Authorization Error")
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

async function Login(parent,args){
// console.log(args);

const {username,password}=args.employee;
try {
    const employee = await EmployeeModel.findOne({username});
    if(employee){
        const flag=isPasswordExpired(employee)
        if(!flag){
            if(password==employee.password){
                return{
                    username:employee.username,
                    _id:employee._id,
                    email:employee.email,
                    role:employee.role,
                    address:employee.address,
                    token:generateToken({
                        role:employee.role,
                        id:employee._id,
                    }),
                    employer:employee.employer
                }
            }
            else{
                throw new Error("Enter Correct Password");
            }
        }
        else{
            throw new Error("Password Expired Please Reset");
        }
    }
    else{
        throw new Error("Wrong Username");
    }
} catch (error) {
    throw new Error(error.message)
}
}

async function getEmployeeById(parent,args,{req,Adminauth,EmployerAuth,EmployeeAuth}){
    // console.log(args);
    try {
        //check who is doing query with help of token provided
        const isAdmin=await Adminauth(req.headers.token);
        // console.log("Admin?"+isAdmin);
        const isEmployer=await EmployerAuth(req.headers.token);
        // console.log("EMployer?"+isEmployer);
        const isEmployee=await EmployeeAuth(req.headers.token)
        if(isAdmin || isEmployer || isEmployee._id==args.id){
            //do the query
            return await EmployeeModel.findById(args.id)
        }
        else{
            throw new Error("Authorization Failed");
        }
    } catch (error) {
        throw new Error(error.message);
    }
    
}

async function updateEmployeeEmail(parent,args,{req,Adminauth,EmployerAuth}){
    // console.log(args);
    try {
        const isAdmin=await Adminauth(req.headers.token);
        const isEmployer=await EmployerAuth(req.headers.token);
        if(!isAdmin && !isEmployer){
            throw new Error('Unauthorized Access');
        }
        let employee = await EmployeeModel.findById(args.id);
        if(!employee){
            throw new Error('Invalid ID Doesnt Exist');
        }
        let updatedEmployee = await EmployeeModel.updateOne({
            _id: args.id
        },{
          ...args.data
        })
        return await EmployeeModel.findById(args.id);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateEmployeeData(parent,args,{req,Adminauth,EmployerAuth,EmployeeAuth}){
    // console.log(args);

    //args.id id of employee to update
    //args.data data to be updated

    try {
        const isAdmin=await Adminauth(req.headers.token);
        const isEmployer=await EmployerAuth(req.headers.token);
        const isEmployee=await EmployeeAuth(req.headers.token);
        if(isEmployee._id==args.id){
            let employee = await EmployeeModel.findById(args.id);
            if(!employee){
                throw new Error('Invalid Data Doesnt Exist');
            }
            let updatedEmployee = await EmployeeModel.updateOne({
                _id: args.id
            },{
              ...args.data
            })
            return await EmployeeModel.findById(args.id);
        }
        else{
            throw new Error("You are not Authorized");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteEmployee(parent,args,{req,Adminauth,EmployerAuth}){
    // console.log(args);
    try {
        const isAdmin=await Adminauth(req.headers.token);
        const isEmployer=await EmployerAuth(req.headers.token);
        if(isAdmin || isEmployer){
            //do delete operation
            const deleteEmployee=await EmployeeModel.findOneAndDelete({_id : args.id});
            console.log("deleted employee "+JSON.stringify(deleteEmployee));
            if (!deleteEmployee) {
                throw new Error ("Employee ID Doesnt exist Delete The User")
            }else{
               return  {message:"User Has Been Deleted"}
            }
        }
        else{
            throw new Error("JWT Authorization Failed")
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updatePassword(parent,args,{req,checkPasswordAuth}){
    try {
        const isEmployer= await checkPasswordAuth(args,"employee");
        console.log(isEmployer);
        if(isEmployer){
            const updateData=await EmployeeModel.findOneAndUpdate({
                email:args.email
            },{
                password:args.newPassword,
                lastPasswordChange:Date.now()
            });
            if(updateData){
                return {
                    message:"Employee Password Updated Successfully"
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

module.exports={addEmployee,getEmployees,Login,getEmployeeById,updateEmployeeEmail,updateEmployeeData,deleteEmployee,updatePassword}