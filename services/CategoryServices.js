const asyncHandler = require('express-async-handler');

const { CategoryModel } = require('../models/CategoryModel');

//Add category
//route Post /
//  Web
exports.addCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    console.log(name);
    const category = await CategoryModel.create({ name: name });
    console.log("Done");
    res.status(200).json({ data: category });
});

//  show Category
//route  GET 
//    Web mobile
exports.getAllCategories=asyncHandler(async(req,res)=>{
    const AllCate=await CategoryModel.find({}); 
    res.status(200).json({length:AllCate.length,data:AllCate}) 
  })
