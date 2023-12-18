const express=require('express');

const {signup,login}=require('../services/authServices');
const {validateSignUp,validateLogin}=require('../utils/Validators/authValidator');

const router=express.Router()
//router.post("/",addCategory)
router.route("/signup").post(validateSignUp,signup),
router.route("/login").post(validateLogin,login),


//router.get("/",getAllCategories)
module.exports=router