const EmployerSchema=`
    type Employer{
        _id:String
        username:String!
        email:String!
        role:String!
        address:String!
        phoneNumber:String!
        token:String
    }

    type Query{
        getEmployers:[Employer]!
        getEmployerById(id:ID!):Employer!
        
    }

    type Mutation{
        addEmployer(employer:employerInput):Employer!
        EmployerLogin(employer:Login):Employer!
        updateEmployerName(id:ID! ,username:String! ):Employer!
        deleteEmployer(id:ID!):Status!
        updateEmployeePassword(email:String!,oldPassword:String!,newPassword:String!):Status!
    }

    input employerInput{
        username:String!
        password:String!
        email:String!
        address:String!
        phoneNumber:String!
    }
    input Login{
        username:String!
        password:String!
    }
`
module.exports={EmployerSchema};