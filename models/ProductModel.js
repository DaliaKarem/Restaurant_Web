const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "ProductName is required"],
        minlength: [3, 'Too short'],
        maxlength: [30, 'Too long']
    },
    desc:{
        type: String,
        required: [true, "ProductDesc is required"],
        minlength: [3, 'Too short'],
        maxlength: [30, 'Too long']
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
    img: {
        name: String,
        image: {
          data: {
            type: Buffer,
            required: [true, "Product img data is required"]
          },
          contentType: {
            type: String,
            required: [true, "Product img contentType is required"]
          }
        }
      },
    //name:String    image{ data: Buffer  contentType: String}
   category:{
    type: Schema.Types.ObjectId,
    ref:'Category',
      required: [true, "product must belong to Category "],
       },
      Rating:{
        type: Number,
        minlength: [1, 'Too short'],
        maxlength: [5, 'Too long']
      }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
