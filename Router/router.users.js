const express =  require("express")
require("dotenv").config();



const router = express.Router();  // mini express app 
const userController = require("../Controller/users.controller");
const verifyauth = require("../middlewares/verifyauth")
router.route('/')
.get(verifyauth , userController.getalluser)




router.route('/register')
.post(userController.register)


router.route('/login')
.post(userController.login)

module.exports = router ;
