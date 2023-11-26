const express=require('express');
const{addCategory,getAllCategories}=require('../services/CategoryServices');
const{validateAddCateg}=require('../utils/Validators/CategoryValidator');
const router=express.Router()
router.route("/").post(validateAddCateg,addCategory).get(getAllCategories);

module.exports=router;