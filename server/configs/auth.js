const jwt=require("jsonwebtoken");

const generateToken=(object)=>{
    console.log(object);
    if(object.role=="employer")
        var token=jwt.sign(object,process.env.JWT_SECRET,{expiresIn:"2d"});
    else if(object.role=="admin")
        var token=jwt.sign(object,process.env.JWT_SECRET,{expiresIn:"7d"});
    else{
        var token=jwt.sign(object,process.env.JWT_SECRET,{expiresIn:"1d"});
    }
    // console.log(token);
    return token;
}

module.exports={generateToken};