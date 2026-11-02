
const {body } = require("express-validator")

const validationSchema = ()=>{
       return [
            body("title")
              .notEmpty()
              .withMessage("Title is Require") 
              .isLength({min:"2"}).withMessage("MIn Size is 2 char") ,
    
            body("price")
               .notEmpty().withMessage("Price is reqire")
               .isLength({min:"3"}).withMessage("MIn Size is 3 num") 
        ]
}

module.exports = {
    
    validationSchema
};