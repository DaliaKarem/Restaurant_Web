const express=require('express');
const {protect}=require('../services/authServices');
const{addCategory,getAllCategories}=require('../services/CategoryServices');
const{validateAddCateg}=require('../utils/Validators/CategoryValidator');
const router=express.Router()
router.route("/").post(protect,validateAddCateg,addCategory).get(getAllCategories);

module.exports=router;