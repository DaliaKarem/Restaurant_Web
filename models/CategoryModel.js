const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category is required"],
        unique: [true, "Category has to be unique"],
        minlength: [3, 'Too short'],
        maxlength: [15, 'Too long']
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
