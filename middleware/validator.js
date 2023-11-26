const {  validationResult } = require('express-validator');

const validate=(req,res,next)=>{
    //benefit of Validator before enter in services ,catch error  
     const err=validationResult(req);
     if(!err.isEmpty())
     {
         return res.status(400).json({err:err.array()});
     }
     next();
 }
 module.exports=validate