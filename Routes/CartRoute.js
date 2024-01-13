const express=require('express');
const {protect}=require('../services/authServices');
const{addtoCart,getAllCart,DeleteCart}=require('../services/CartServices');
const router=express.Router()
//Add -> /Fav/:UserId/:RestaurantId/:ProductId
//Get ->/Fav/:UserId/:RestaurantId

router.route("/:user/:Rest/:nameProduct").post(addtoCart).delete(DeleteCart);
router.route("/:user/:Restid").get(getAllCart);

module.exports=router;