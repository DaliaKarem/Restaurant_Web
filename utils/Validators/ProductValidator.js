const { check} = require('express-validator');
const validatorMiddelWare=require('../../middleware/validator')

exports.validateSpecificProduct=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]

const categories = require('../../models/CategoryModel')

exports.validateAddProduct=[
    check('name').notEmpty().withMessage("Name Req").isLength({min:3}).withMessage("To Short").isLength({max:50}).withMessage("To long"),
    check('desc').notEmpty().withMessage("Description req").isLength({min:10}).withMessage("to short"),
    check('price').notEmpty().withMessage("Price req").isLength({max:20}).withMessage("to long"),
    check('img').notEmpty().withMessage("Image is required"),
    check('price_Dis').optional().isNumeric().toFloat().withMessage("price Dis is number")
    //have to make sure that the price after price_Dis is the greatest value  
    .custom((value,{req})=>{
        if(value>=req.body.price){
            throw new Error("price Dis must be less than price")
        }
        return true
    }),
    check('category')
  .notEmpty()
  .withMessage('Category required')
  .isMongoId()
  .withMessage('Invalid category')
  .custom(async (value) => {
    const cate = await categories.findById(value);
    if (!cate) {
      throw new Error('Invalid Category'+value); // Change to throw an instance of Error
    }
  }),
    check('Rating').optional().isNumeric().withMessage("Rating must be a number").isLength({max:5}).withMessage("To long").isLength({min:1}).withMessage("to short"),
   // check('numOfRating').optional().isNumeric().withMessage("numOfRating must be a number").isLength({max:5}).withMessage("To long").isLength({min:1}).withMessage("to short"),
    validatorMiddelWare,
]

exports.validateUpdateProduct=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]


exports.validateDeleteProduct=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]