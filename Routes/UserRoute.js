const express=require('express');

const {RateUserResturant,ChangeUserPassword,addUser,getAllUsers,getSpacificUser,DeleteSpacificUser,UpdateSpacificUser}=require('../services/userServices');
const {validateAddUser,validateDeleteUser,validateSpecificUser,validateUpdateUser,validateChangePassword}=require('../utils/Validators/UserValidator');

const router=express.Router()
//router.post("/",addCategory)
router.route("/").post(validateAddUser,addUser).get(getAllUsers)
router.route("/:id").post(RateUserResturant).get(validateSpecificUser,getSpacificUser).put(validateUpdateUser,UpdateSpacificUser).delete(validateDeleteUser,DeleteSpacificUser)
router.route("/changePassword/:id").put(validateChangePassword,ChangeUserPassword)
//:id/Subcategories  to get all categories from categoriesID


//router.get("/",getAllCategories)
module.exports=router