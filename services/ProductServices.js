const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/ProductModel');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path=require('path');
//image upload

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg4OGRiZDBmMzgxM2IxNWQ0Y2IzMzciLCJpYXQiOjE3MDQ0NTk4NDcsImV4cCI6MTczMDM3OTg0N30.W44cGxAq-lhaX3lwZRP3zSH2ZeCsSsZCNmEMSBzrJZc"
exports.addProduct = asyncHandler(async (req, res) => {
  console.log('Add Product');
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
  const product = await ProductModel.findById(id).populate('category','name').find({user});

  if (!product) {
      res.status(404).json({ msg: `Error There is no Product With this ID ${productId}` });
  }

  res.status(200).json({ data: product });      
})
//des   UPDATE specific Products
//route  Update /api/v1/Products
//acc    admin(private)
exports.UpdateSpacificProduct=asyncHandler(async(req,res)=>{  
  console.log("UpdateSpacificProduct");

    const {id}=req.params;
   const Product=await ProductModel.findByIdAndUpdate({_id:id},req.body,{update:true}); 
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
    product.ratings.push(rate);
  
    console.log("Ratings: ", product.ratings);
  
    // Calculate the average rating
    const totalRating = product.ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / product.ratings.length;
  
    console.log("Number of Ratings:", product.ratings.length);
    console.log("Average Rating:", averageRating);
    product.ratings = averageRating;
    // Save the updated product
    const updateProduct=await product.save();
  
    res.status(200).json({ data: updateProduct });
  });
  