const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/ProductModel');
const cors = require('cors');
const multer = require('multer');
const path=require('path');
const storage = multer.diskStorage({
  destination:function(req, file,cb){
    cb(null,path.join(__dirname,"../Images"))
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname)
  }
});

const upload = multer({ storage: storage });

// Add Product
// POST /api/v1/Products
// Admin(private)
exports.addProduct = asyncHandler(upload.single('Image'), async (req, res) => {
  console.log("Add product");
  console.log("Images sssss ", req.file);

  const product = await ProductModel.create(req.body);

  product.save()

  res.status(200).json({ success: true, data: product });
});

//des   get All Products
//route  Get /api/v1/Products
//acc    all(public)
exports.getAllProducts=asyncHandler(async(req,res)=>{
  const AllProduct=await ProductModel.find().populate('category','name'); 
  //console.log("Category is "+populate('category','name'));
  res.status(200).json({success:true,length:AllProduct.length,data:AllProduct}) 
})

//des   get specific Product
//route  Get /api/v1/Products/:id
//acc    all(public)
exports.getSpacificProduct=asyncHandler(async(req,res,next)=>{ 
    const {id}=req.params;
    const Product=await ProductModel.findById(id); 
    if(!Product)
    {
    // return next(new ApiError(`Error There is no Product With this ID ${id}`,404))
    res.status(404).json({msg:`Error There is no Product With this ID ${id}`})
    }
    res.status(200).json({data:Product})        
})
//des   UPDATE specific Products
//route  Update /api/v1/Products
//acc    admin(private)
exports.UpdateSpacificProduct=asyncHandler(async(req,res)=>{  
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
    const {id}=req.params;
    const Cate=await ProductModel.findByIdAndDelete(id); 
    if(!Cate)
    {
        res.status(404).json({msg:`Error There is no Category With this ID ${id}`}) 
  
    }
    res.status(204).json({msg:`Done...Delete Category With this ID ${id}`}) 

  })  