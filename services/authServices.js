const asyncHandler = require('express-async-handler')
const UserModel=require('../models/UserModel');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

//  Post  /auth/Signup
// public
exports.signup=asyncHandler(async(req,res)=>{
    //ater create i will generate token for users
    const user=await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    //token -->Header(type ,alg) Pyload(Data ) secret key will be in config
    var token = jwt.sign({ userId:user.id }, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_Exp,
    });
    console.log("token is  "+token);
    res.status(201).json({success:true,data:user,token})
})
exports.login=asyncHandler(async (req, res) => {

    const user=await UserModel.findOne({email:req.body.email})
   // console.log("password is  "+req.body.password+"  "+user.password)
    if(!user||!(await bcrypt.compare(req.body.password,user.password))){
         res.status(404).json({success:false,msg:`Error n password or Email`})
    }
    var token = jwt.sign({ userId:user.id }, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_Exp,
    });
    res.status(201).json({success:true,data:user,token})

})

//Protect methods
//to make sure that the admin has rights to add or delete 
exports.protect = asyncHandler(async(req, res,next)=>{
//check token exist - verify token -check user exists with id - check if user change pass after token created
//token will exist in headers Authorization
console.log(req.headers);
var token;
if(req.headers.authorization){
token =req.headers.authorization.split(' ')[1];
console.log(token);
}
if(!token){
    res.status(401).json({success:false,msg:`u have to login first`})

}

try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await UserModel.findById(decode.userId);
    req.user = currentUser;
    next();
} catch (error) {
    res.status(401).json({ success: false, msg: 'Invalid token' });
}

})