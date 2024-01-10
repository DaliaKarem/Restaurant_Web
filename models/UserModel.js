const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require('bcrypt');
const UserSchema = new Schema({

    name:{
        type: 'string',
        trim: true,
        required: [true,"name of user is required"],
       minLength:[3,"too short"],
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
    },
    active:{
        type: 'boolean',
        default: true,
    },
    rateRes:{
        type: Number,
        minlength: [0, 'Too short'],
        maxlength: [6, 'Too long']
    },
    img: {
        type: String,
        required: true,
      },
},{timestamps: true});
UserSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();
    this.password= await bcrypt.hash(this.password,12);
    next();
})
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;