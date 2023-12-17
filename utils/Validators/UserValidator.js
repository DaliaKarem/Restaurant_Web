const { check,body} = require('express-validator');
const validatorMiddelWare=require('../../middleware/validator')
const userModel=require("../../models/UserModel");
const bcrypt = require('bcrypt');
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

exports.validateChangePassword=[
    check('id').isMongoId().withMessage('Invalid Id'),
    body('current_password').notEmpty().withMessage('Enter Password'),
    body('confirm_password').notEmpty().withMessage('Enter Confirmation Password'),

    body('password').notEmpty().withMessage('Enter NewPassword').custom(async(val,{req})=>{
        //verify current password and current password equal to confirm password
        const user=await userModel.findById(req.params.id)
        if(!user)
        {
            throw new Error('there is no user with this Id '); 

        }
        console.log("actual user pass is "+user.password +'  from body is '+req.body.current_password)
        const isEqual= await bcrypt.compare(req.body.current_password,user.password);
       console.log("user pass and req is "+isEqual);
       if(!isEqual)
       {
        throw new Error('InCorrect password'); 

       }  
       console.log("val "+val   +"   confi" +req.body.confirm_password);
       if(val !== req.body.confirm_password)
       {   console.log("Errroooo");
           throw new Error('pass confirm not equal pass ' + val  + ' '+req.body.passwordConfrm); 
       }
       return true;
    }),
       validatorMiddelWare,

]

exports.validateDeleteUser=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]