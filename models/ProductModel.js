const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  name: {
    type: String,
    required: [true, "ProductName is required"],
    minlength: [3, 'Too short'],
    maxlength: [30, 'Too long']
  },
  desc: {
    type: String,
    required: [true, "ProductDesc is required"],
    minlength: [3, 'Too short'],
    maxlength: [60, 'Too long']
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
    minlength: [2, 'Too short'],
    maxlength: [5, 'Too long']
  },
  price_Dis: {
    type: Number,
    minlength: [3, 'Too short'],
    maxlength: [30, 'Too long']
  },
  ratings: 
    {
      default:0,
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Rating is required"],
    },
  
  img: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "Product must belong to Category"],
  },
}, { timestamps: true });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
