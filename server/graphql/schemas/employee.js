const EmployeeSchema=`
    type Employee{
        username:String!
        email:String!
        role:String!
        address:String!
        phoneNumber:String!
        token:String
        employer:Employer
    }

    type Status{
        message:String!
    }

    type Query{
        getEmployees:[Employee]!
        getEmployeeById(id:ID!):Employee!
    }

    type Mutation{
        addEmployee(employee:EmployeeData):Employee
        EmployeeLogin(employee:Login):Employee
        updateEmployeeEmail(id:ID!,data:EmailAndEmployer):Employee!  
        updateEmployeeData(id:ID!,data:updateEmployeeDetails):Employee!
        deleteEmployee(id:ID!):Status!
        updateEmployerPassword(email:String!,oldPassword:String!,newPassword:String!):Status!
    }

    input Login{
        username:String!
        password:String!
    }


    input updateEmployeeDetails{
        address:String
        phoneNumber:String
    }

    input EmailAndEmployer{
        email:String
        employer:ID
    }

    input EmployeeData{
        username:String!
        password:String!
        email:String!
        address:String!
        phoneNumber:String!
        employer:ID!
    }

`

module.exports={EmployeeSchema};