const { Adminauth,EmployerAuth, EmployeeAuth,checkPasswordAuth} = require("../middlewares/authorization")

module.exports=({req,res})=>{
    return {
        req,
        res,
        Adminauth,
        EmployerAuth,
        EmployeeAuth,
        checkPasswordAuth,
    }
}