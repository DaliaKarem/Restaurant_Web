const asyncHandler = require('express-async-handler')
const UserModel=require('../models/UserModel');
const bcrypt=require('bcrypt')


exports.addUser=asyncHandler(async(req,res)=>{
  console.log("Add User")
  
    const product = await UserModel.create(req.body);
    res.status(200).json({ success: true, data: product });
})


exports.getAllUsers=asyncHandler(async(req,res)=>{
  const AllProduct=await UserModel.find(); 
  res.status(200).json({success:true,length:AllProduct.length,data:AllProduct}) 
})

exports.getSpacificUser=asyncHandler(async(req,res,next)=>{ 
    const {id}=req.params;
    const User=await UserModel.findById(id); 
    if(!User)
    {
    // return next(new ApiError(`Error There is no Product With this ID ${id}`,404))
    res.status(404).json({msg:`Error There is no User With this ID ${id}`})
    }
    res.status(200).json({data:User})        
})

exports.UpdateSpacificUser=asyncHandler(async(req,res)=>{  
    const {id}=req.params;
   const User=await UserModel.findByIdAndUpdate({_id:id},{
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    role:req.body.role
  },{update:true}); 
    if(!User)
    {
        res.status(404).json({msg:`Error There is no User With this ID ${id}`})
    }
    res.status(200).json({data:User})
})

exports.ChangeUserPassword=asyncHandler(async(req,res)=>{  
  const {id}=req.params;
  console.log(`---------ChangeUserPassword--------- `);
 const User=await UserModel.findByIdAndUpdate({_id:id},{
  password:await bcrypt.hash(req.body.password,12)
},{update:true}); 
  if(!User)
  {
      res.status(404).json({msg:`Error There is no User With this ID  ${id}`})
  }
  res.status(200).json({data:User})
})

exports.DeleteSpacificUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const User=await UserModel.findByIdAndDelete(id); 
    if(!User)
    {
        res.status(404).json({msg:`Error There is no User With this ID ${id}`}) 
  
    }
    res.status(204).json({msg:`Done...Delete User With this ID ${id}`}) 

  })  