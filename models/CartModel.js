const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  Rest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  nameProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
  },
  
}, { timestamps: true });

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
