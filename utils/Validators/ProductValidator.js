const { check} = require('express-validator');
const validatorMiddelWare=require('../../middleware/validator')

exports.validateSpecificProduct=[
    check('id').isMongoId().withMessage('Invalid Id'),
     validatorMiddelWare,
]

const categories = require('../../models/CategoryModel')

exports.validateAddProduct=[
    check('name').notEmpty().withMessage("Name Req").isLength({min:3}).withMessage("To Short").isLength({max:50}).withMessage("To long"),
    check('description').notEmpty().withMessage("Description req").isLength({min:10}).withMessage("to short"),
    check('price').notEmpty().withMessage("Price req").isLength({max:20}).withMessage("to short"),
    check('first_image').notEmpty().withMessage("Image is required"),
    check('imgs').optional().isArray().withMessage("Image is required"),
    check('solid').optional().isNumeric().withMessage("quantity is must be a number"),
    check('quantity').notEmpty().withMessage("quantity is Req").isNumeric().withMessage("quantity is must be a number"),
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
      throw new Error('Invalid Category'); // Change to throw an instance of Error
    }
  }),

  check('subCategory').optional().isMongoId().withMessage('Invalid subcategory')
  .custom(async(value) => {
    //get all subcategories and $in check is any  id in array   exist in this all sub or not
     subcategories.find({_id:{$exists:true ,$in:value}}).then((result) =>{
        //make sure all subcategories= result
        if(result.length<1 || result.length!==value.length )   {   throw new Error('Invalid Category');} 

    });
  
  })
  .custom(async (value, { req }) => {
    const result = await subcategories.find({ category: req.body.category });
    // Bring subcategories that belong to the result and put them in subcate
    const subcate = result.map(i => i._id.toString());
    console.log(subcate);
    // Check if all subcategories in req.body.subcategories are included in subcate
    const Check = value.every(v => subcate.includes(v));
    if (!Check) {
        return Promise.reject(new Error("SubCategories don't belong to this category"));
    }
}),

    check('Rating').optional().isNumeric().withMessage("Rating must be a number").isLength({max:5}).withMessage("To long").isLength({min:1}).withMessage("to short"),
    check('numOfRating').optional().isNumeric().withMessage("numOfRating must be a number").isLength({max:5}).withMessage("To long").isLength({min:1}).withMessage("to short"),
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