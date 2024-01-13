const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel'); // Import your User model
const ProductModel = require('../models/ProductModel'); // Import your Product model
const FavModel = require('../models/FavModel'); // Import your Fav model

//image upload

//For users
//will need Restaurant id, Product id and User id
// /Fav/:UserId/:RestaurantId/:ProductId
exports.addtoFav = asyncHandler(async (req, res) => {
  console.log('Add Product ToFav');
  const { Rest, nameProduct, user } = req.params;

  // 1. Find the user and product by their IDs
  const foundUser = await UserModel.findById(user);
  const foundRest = await UserModel.findById(Rest);
  const foundProduct = await ProductModel.findById(nameProduct);
  console.log("user is " + foundUser + " and product is " + foundProduct + " and Rest is " + foundRest);

  if (!foundUser || !foundProduct || !foundRest) {
    return res.status(404).json({ success: false, message: 'User/Restaurant or Product not found' });
  }

  // Check if the product exists in the specified restaurant
  const productExistsInRestaurant = await ProductModel.findOne({
    _id: foundProduct._id,
    user: foundRest._id,
  });

  console.log("Product " + productExistsInRestaurant);

  if (!productExistsInRestaurant) {
    return res.status(404).json({ success: false, message: 'Product does not exist in the specified restaurant' });
  }

  console.log(productExistsInRestaurant + " exists in the specified restaurant");

  // 2. Create a new favorite entry in the FavModel
  const newFavorite = await FavModel.create({
    user: foundUser._id,
    Rest: foundRest._id,
    nameProduct: foundProduct._id,
  });

  console.log('product: ' + newFavorite);
  res.status(200).json({ success: true, data: newFavorite });
});

//For users
//will need Restaurant id, Product id and User id
// /Fav/:UserId/:RestaurantId
//Get All Fav
exports.getAllFav = asyncHandler(async (req, res)=>{
  console.log('Get All Fav for user');
  const{Restid,user} = req.params;
  console.log("user : ",user ," Rest : ",Restid)
  const product = await FavModel.find({
    user: user,
    Rest: Restid
  });
  console.log("product: " + product)
   if(!product)
   {
    res.status(404).json({ msg: `Error There is no Fav For this user  ${user}` });

   }
   res.status(200).json({ success: true, length:product.length,data: product });      

})
// /Fav/:UserId/:RestaurantId/:ProductId

exports.DeleteFav = asyncHandler(async (req, res)=>{
  console.log('Delete this product from  Fav');
  const { Rest, nameProduct, user } = req.params;
  console.log("user : ",user ," Rest : ",Rest , " Prodcut : ",nameProduct)
  const product = await FavModel.findOneAndDelete({
    user: user,
    Rest: Rest,
    nameProduct: nameProduct,
  });
  console.log("product: " + product)
   if(!product)
   {
    res.status(404).json({ msg: `Error There is no Fav For this user  ${user}` });

   }
   res.status(200).json({ success: true, length:product.length,data: product });      

})