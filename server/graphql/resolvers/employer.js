const { addEmployer, getEmployers, EmployerLogin, getEmployerById, updateEmployerName,deleteEmployer, updatePassword } = require("../../controllers/employer");
const { EmployerModel } = require("../../models/employer")

const EmployerResolver={
    Query:{
        getEmployers:getEmployers,
        getEmployerById:getEmployerById
    },
    Mutation:{
        addEmployer:addEmployer,
        EmployerLogin:EmployerLogin,
        updateEmployerName:updateEmployerName,
        deleteEmployer:deleteEmployer,
        updateEmployerPassword:updatePassword
    }
}


module.exports={EmployerResolver};