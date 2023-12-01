const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "ProductName is required"],
        unique: [true, "ProductName has to be unique"],
        minlength: [3, 'Too short'],
        maxlength: [30, 'Too long']
    },
    desc:{
        type: String,
        required: [true, "ProductDesc is required"],
        unique: [true, "ProductDesc has to be unique"],
        minlength: [3, 'Too short'],
        maxlength: [30, 'Too long']
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
        unique: [true, "Product Price has to be unique"],
        minlength: [3, 'Too short'],
        maxlength: [30, 'Too long']
    },
    img:{
        type: String,
        required: [true, "Product img is required"],
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("Product", ProductSchema);

module.exports = CategoryModel;
