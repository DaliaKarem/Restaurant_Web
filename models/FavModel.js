const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavSchema = new Schema({
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

const FavModel = mongoose.model("Fav", FavSchema);

module.exports = FavModel;
