const { generateToken } = require("../../configs/auth");
const { Login } = require("../../controllers/admin");
const { AdminModel } = require("../../models/admin");

const adminResolver={
    Mutation:{
        adminLogin:Login
    }
}

module.exports={adminResolver}