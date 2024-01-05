const express=require('express');
const {protect}=require('../services/authServices');
const {RateProducts,getAllProductsWithSameCate,addProduct,getAllProducts,getSpacificProduct,DeleteSpacificProduct,UpdateSpacificProduct}=require('../services/ProductServices');
const {validateAddProduct,validateDeleteProduct,validateUpdateProduct,validateSpecificProduct}=require('../utils/Validators/ProductValidator');

const router=express.Router()
//router.post("/",addCategory)
router.route("/").post(validateAddProduct,addProduct)
router.route("/:user").get(getAllProducts)
router.route("/:user/Cate/:id").get(getAllProductsWithSameCate)
router.route("/:user/:id").post(RateProducts).get(validateSpecificProduct,getSpacificProduct).put(protect,validateUpdateProduct,UpdateSpacificProduct).delete(validateDeleteProduct,DeleteSpacificProduct)
//:id/Subcategories  to get all categories from categoriesID


//router.get("/",getAllCategories)
module.exports=router