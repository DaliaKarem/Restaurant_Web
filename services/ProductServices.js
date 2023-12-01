const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError=require('../utils/apiError')

const ProductModel=require('../models/ProductModel')

//des   Add Product
//route  POST /api/v1/Products
//acc    Admin(private)
exports.addProduct=asyncHandler(async(req,res)=>{
  
    req.body.slug=slugify(req.body.name)    
  const product=await ProductModel.create(req.body);
  res.status(201).json({data:product})
})

//des   get All Products
//route  Get /api/v1/Products
//acc    all(public)
exports.getAllProducts=asyncHandler(async(req,res)=>{
  const AllProduct=await ProductModel.find(req.query); 
  res.status(200).json({length:AllProduct.length,data:AllProduct}) 
})

//des   get specific Product
//route  Get /api/v1/Products/:id
//acc    all(public)
exports.getSpacificProduct=asyncHandler(async(req,res,next)=>{ 
    const {id}=req.params;
    const Product=await ProductModel.findById(id); 
    if(!Product)
    {
     return next(new ApiError(`Error There is no Product With this ID ${id}`,404))
    //res.status(404).json({msg:`Error There is no Product With this ID ${id}`})
    }
    res.status(200).json({data:Product})        
})
//des   UPDATE specific Products
//route  Update /api/v1/Products
//acc    admin(private)
exports.UpdateSpacificProduct=asyncHandler(async(req,res)=>{  
    const {id}=req.params;
   if(req.body.name)
   {
    req.body.slug=slugify(req.body.name);

   }

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
    const {id}=req.params;
    const Cate=await ProductModel.findByIdAndDelete(id); 
    if(!Cate)
    {
        res.status(404).json({msg:`Error There is no Category With this ID ${id}`}) 
  
    }
    res.status(204).json({msg:`Done...Delete Category With this ID ${id}`}) 

  })  