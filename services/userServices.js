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


  //Post

  exports.RateUserResturant = asyncHandler(async (req, res) => {
    const { id } = req.params; // Restaurant ID
    console.log(`---------Rate Restaurant--------- `);
  
    // Assume rate is sent in the request body, adjust as needed
    const { rate } = req.body;
  
    // Find the Res from the UserModel
    const user = await UserModel.findById(id);
  
    if (!user) {
      return res.status(404).json({ msg: `Error There is no Res With this ID ${id}` });
    }
  
    // Add the new rating to the user's rateRes array
    user.rateRes.push(rate);
    console.log("Rate  ",rate);
    // Calculate the average rating
    const totalRating = user.rateRes.reduce((sum, userRate) => sum + userRate, 0);
    const averageRating = totalRating / user.rateRes.length;
    console.log("num of rate :",user.rateRes.length);

    user.rateRes = averageRating;
     console.log("Updated ",user);
    const updatedUser = await user.save();
  
    res.status(200).json({ data: updatedUser });
  });
  