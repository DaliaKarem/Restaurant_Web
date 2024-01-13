const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/ProductModel');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path=require('path');
//image upload

//For users
//will need Restaurant id, Product id and User id
// /:UserId/:RestaurantId/:ProductId
exports.addtoFav = asyncHandler(async (req, res) => {
  console.log('Add Product ToFav');
  const{RestId,ProductId,UserId} = req.params;
  const product = await ProductModel.create(req.body);

  res.status(200).json({ success: true, data: product });
});
//will need Restaurant id, Product id and User id
// /:UserId/:RestaurantId/:ProductId
exports.addtoCart = asyncHandler(async (req, res) => {
    console.log('Add Product to Cart');
    console.log(req.body);
    //const userId = req.headers.authorization.replace('Bearer', '');
    //console.log("User Id " + userId);
  
    const product = await ProductModel.create(req.body);
  
    res.status(200).json({ success: true, data: product });
  });
//des   get All Products
//route  Get /Products/:user
//acc    all(public)
exports.getAllProducts=asyncHandler(async(req,res)=>{
  console.log("getAllProducts");
  const {user}=req.params;
  const AllProduct=await ProductModel.find({user}).populate('category','name'); 
  if(!AllProduct)
    {
    // return next(new ApiError(`Error There is no Product With this ID ${id}`,404))
    res.status(404).json({msg:`Error There is no Product In this Restaurant ${user}`})
    }
  res.status(200).json({success:true,length:AllProduct.length,data:AllProduct}) 
})
//des   get All Products
//route  Get /Products/:user/:Category
//acc    all(public)
exports.getAllProductsWithSameCate = asyncHandler(async (req, res) => {
  console.log("getAllProductsWithSameCate");
  const { user, id } = req.params;

  const AllProduct = await ProductModel.find({category:id,user:user}).populate('category', 'name');
  console.log(user, " ", id);
  console.log(AllProduct);
  if (!AllProduct) {
    res.status(404).json({ msg: `Error There is no Product In this Restaurant with this Cate ${cate}` });
  }
  res.status(200).json({ success: true, length: AllProduct.length, data: AllProduct });
});

//des   get specific Product
//route  Get /Products/:user/:id
//acc    all(public)
exports.getSpacificProduct=asyncHandler(async(req,res,next)=>{ 
  console.log("getSpacificProduct");

  const { user, id } = req.params;
  const product = await ProductModel.findById(id).populate('category','name').find({ user });

  if (!product) {
      res.status(404).json({ msg: `Error There is no Product With this ID ${id}` });
  }

  res.status(200).json({ data: product });      
})
//des   UPDATE specific Products
//route  Update /api/v1/Products
//acc    admin(private)
exports.UpdateSpacificProduct=asyncHandler(async(req,res)=>{  
  console.log("UpdateSpacificProduct");

    const {id}=req.params;
   const Product=await ProductModel.findByIdAndUpdate(id,req.body,{update:true}); 
    if(!Product)
    {
        res.status(404).json({msg:`Error There is no Product With this ID ${id}`})
    }
    res.status(200).json({data:Product})
})
//des   Delete spacific Product
//route  Delete /api/v1/Prodcts/:id
//acc    Admin(private)
exports.DeleteSpacificProduct=asyncHandler(async(req,res)=>{
  console.log("DeleteSpacificProduct");

    const {id}=req.params;
    const Cate=await ProductModel.findByIdAndDelete(id); 
    if(!Cate)
    {
        res.status(404).json({msg:`Error There is no Category With this ID ${id}`}) 
  
    }
    res.status(204).json({msg:`Done...Delete Category With this ID ${id}`}) 

  })  
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

    // Update the user's rateRes with the new rating
    user.rateRes = (rate+user.rateRes)/2;
    console.log("Rate  ", rate);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ data: updatedUser });
});
  exports.RateProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(`---------Rate Product--------- `);
  
    // Assume rate is sent in the request body, adjust as needed
    const { rate } = req.body;
  
    const product = await ProductModel.findById(id);
    console.log(`---------Product`, product);
    if (!product) {
      return res.status(404).json({ msg: `Error There is no Res With this ID ${id}` });
    }
  
    // Add the new rating to the ratings array
    product.ratings = (rate+ product.ratings)/2;
    // Save the updated product
    const updateProduct=await product.save();
  
    res.status(200).json({ data: updateProduct });
  });