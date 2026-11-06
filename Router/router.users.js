const express =  require("express")
require("dotenv").config();



const router = express.Router();  // mini express app 
const userController = require("../Controller/users.controller");
const { success } = require("../utils/httpstatus");

router.route('/')
.get(userController.getalluser)




router.route('/register')
.post(userController.register)


router.route('/login')
.post(userController.login)

module.exports = router ;
