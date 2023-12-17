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