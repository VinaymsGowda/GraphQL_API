const { addEmployee, getEmployees, Login, getEmployeeById, updateEmployeeEmail, updateEmployeeData, deleteEmployee, updatePassword } = require("../../controllers/employee");
const { EmployerModel } = require("../../models/employer");

const EmployeeResolver={

    Employee:{
        employer:async(parent)=>{
            // console.log(parent.employer);
            return await EmployerModel.findById(parent.employer);
        }
    },
    Query:{
        getEmployees:getEmployees,   
        getEmployeeById:getEmployeeById,
    },
    Mutation:{
        addEmployee:addEmployee,
        EmployeeLogin:Login,
        updateEmployeeEmail:updateEmployeeEmail,
        updateEmployeeData:updateEmployeeData,
        deleteEmployee:deleteEmployee,
        updateEmployeePassword:updatePassword
    }
}

module.exports={EmployeeResolver}