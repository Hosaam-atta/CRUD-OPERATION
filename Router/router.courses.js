const express =  require("express")
require("dotenv").config();



const {validationSchema} = require('../middlewares/validationSchema')

let courcesController =require('../Controller/cources.controller');
const verifyauth = require("../middlewares/verifyauth");
const allawoto = require("../middlewares/allawoto");
const Role_user = require("../utils/userallow");
// let {Courses} = require('../data/Cources')



const router = express.Router();  // mini express app 


router.route('/')
.get( courcesController.GetAllCourses)
.post(  verifyauth, validationSchema() ,allawoto(Role_user.manger), courcesController.CreateNewCourse)



router.route('/:CourseId')
.get( courcesController.GetSingleCourse)
.patch( courcesController.UpdateOnCource)
.delete(verifyauth ,allawoto(Role_user.ADMIN , Role_user.manger) ,courcesController.DeletCourse )


module.exports = router ;
