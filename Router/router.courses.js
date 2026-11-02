const express =  require("express")

const {body } = require("express-validator")

let courcesController =require('../Controller/cources.controller')
let {Courses} = require('../data/Cources')



const router = express.Router();  // mini express app 


router.route('/').get( courcesController.GetAllCourses)
.post(    
    [
        body("title")
          .notEmpty()
          .withMessage("Title is Require") 
          .isLength({min:"2"}).withMessage("MIn Size is 2 char") ,

        body("price")
           .notEmpty().withMessage("Price is reqire")
           .isLength({min:"3"}).withMessage("MIn Size is 3 num") 
    ], courcesController.CreateNewCourse)



router.route('/:CourseId')
.get( courcesController.GetSingleCourse)
.patch( courcesController.UpdateOnCource)
.delete( courcesController.DeletCourse )


module.exports = router ;
