const express=require('express');
const {protect}=require('../services/authServices');
const {getAllProductsWithSameCate,addProduct,getAllProducts,getSpacificProduct,DeleteSpacificProduct,UpdateSpacificProduct}=require('../services/ProductServices');
const {validateAddProduct,validateDeleteProduct,validateUpdateProduct,validateSpecificProduct}=require('../utils/Validators/ProductValidator');

const router=express.Router()
//router.post("/",addCategory)
router.route("/").post(validateAddProduct,addProduct)
router.route("/:user").get(getAllProducts)
router.route("/:user/:id").get(getAllProductsWithSameCate).get(validateSpecificProduct,getSpacificProduct).put(protect,validateUpdateProduct,UpdateSpacificProduct).delete(validateDeleteProduct,DeleteSpacificProduct)
//:id/Subcategories  to get all categories from categoriesID


//router.get("/",getAllCategories)
module.exports=router