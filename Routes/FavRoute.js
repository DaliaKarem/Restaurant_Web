const express=require('express');
const {protect}=require('../services/authServices');
const{addtoFav,getAllFav,DeleteFav}=require('../services/FavServices');
const router=express.Router()
//Add -> /Fav/:UserId/:RestaurantId/:ProductId
//Get ->/Fav/:UserId/:RestaurantId

router.route("").post(addtoFav).delete(DeleteFav).get(getAllFav);
//router.route("/:user/:Restid").get(getAllFav);

module.exports=router;