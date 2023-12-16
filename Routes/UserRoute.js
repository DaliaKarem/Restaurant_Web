const express=require('express');

const {ChangeUserPassword,addUser,getAllUsers,getSpacificUser,DeleteSpacificUser,UpdateSpacificUser}=require('../services/userServices');
const {validateAddUser,validateDeleteUser,validateSpecificUser,validateUpdateUser}=require('../utils/Validators/UserValidator');

const router=express.Router()
//router.post("/",addCategory)
router.route("/").post(validateAddUser,addUser).get(getAllUsers)
router.route("/:id").get(validateSpecificUser,getSpacificUser).put(validateUpdateUser,UpdateSpacificUser).delete(validateDeleteUser,DeleteSpacificUser)
router.route("/changePassword/:id").put(ChangeUserPassword)
//:id/Subcategories  to get all categories from categoriesID


//router.get("/",getAllCategories)
module.exports=router