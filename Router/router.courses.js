const express =  require("express")

const {body } = require("express-validator")
const {validationSchema} = require('../middlewares/validationSchema')

let courcesController =require('../Controller/cources.controller')
let {Courses} = require('../data/Cources')



const router = express.Router();  // mini express app 


router.route('/')
.get( courcesController.GetAllCourses)
.post( validationSchema() , courcesController.CreateNewCourse)



router.route('/:CourseId')
.get( courcesController.GetSingleCourse)
.patch( courcesController.UpdateOnCource)
.delete( courcesController.DeletCourse )


module.exports = router ;
