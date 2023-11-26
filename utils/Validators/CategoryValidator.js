const { check} = require('express-validator');
const validatorMiddelWare=require('../../middleware/validator')

exports.validateAddCateg=[
    check('name').notEmpty().withMessage("Name Req").isLength({min:3}).withMessage("To Short").isLength({max:30}).withMessage("To long"),
     validatorMiddelWare,
]