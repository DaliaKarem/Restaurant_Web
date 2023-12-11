const { check} = require('express-validator');
const validatorMiddelWare=require('../../middleware/validator')
const userModel=require("../../models/UserModel");
exports.validateSpecificUser=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]
exports.validateAddUser=[
    check('name').notEmpty().withMessage("Name Req").isLength({min:3}).withMessage("To Short"),
    check('email').notEmpty().withMessage("Email Req").isEmail().withMessage("Invalid email address")
    .custom(async (val)=>{
        const user = await userModel.findOne({ email: val });
        if (user) {
            console.log("User: " + user);
            throw new Error('Email in use: ' + val);
          }
    }),
    check('password').notEmpty().withMessage("Pass Req").isLength({min:6}).withMessage("Too Short")
    .custom((password ,{req})=>
    {
        console.log('pass confirm not equal pass ' + password + ' '+req.body.passwordConfrm);
        if(password !== req.body.passwordConfrm)
        {
            throw new Error('pass confirm not equal pass ' + password + ' '+passwordConfrm); 
        }
        return true;
    }
       )   ,
    check('passwordConfrm').notEmpty().withMessage("pass Confirm req"),
    check('phone').optional().isMobilePhone("ar-EG").withMessage("Enter correct phone"),
    
    validatorMiddelWare,
]

exports.validateUpdateUser=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]


exports.validateDeleteUser=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]