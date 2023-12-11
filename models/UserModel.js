const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({

    name:{
        type: 'string',
        trim: true,
        required: [true,"name of user is required"],
    },
    email:{
        type: 'string',
        required: [true,"email of user is required"],
        unique: true,
        lowercase:true
    },
    phone:String,
    password:{
        type: 'string',
        required: [true,"password of user is required"],
        minlength:[6,"too short"],
    },
    role:{
        type: 'string',
        enum: ['admin','user'],
        default: 'user',
    }
},{timestamps: true});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;