const adminSchema=`
    type admin{
        _id:ID,
        username:String,
        role:String,
        token:String
    }

    type Mutation {
        adminLogin(admin:AdminData):admin,
    }

    input AdminData{
        username: String!,
        password: String!,
    }
`

module.exports={adminSchema};