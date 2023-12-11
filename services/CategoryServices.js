const asyncHandler = require('express-async-handler');

const CategoryModel  = require('../models/CategoryModel');

//Add category
//route Post /
//  Web
exports.addCategory = asyncHandler(async (req, res) => {
    console.log("Add Category")
    console.log(req.body)
    let category=await CategoryModel.create(req.body)
    res.status(200).json({success:true,categorys:category});
});
//  show Category
//route  GET 
//    Web mobile
exports.getAllCategories=asyncHandler(async(req,res)=>{
    const AllCate=await CategoryModel.find({}); 
    res.status(200).json({success:true,length:AllCate.length,data:AllCate}) 
  })

