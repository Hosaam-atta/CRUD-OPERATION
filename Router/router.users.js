const express =  require("express")
require("dotenv").config();



const router = express.Router();  // mini express app 
const userController = require("../Controller/users.controller");
const verifyauth = require("../middlewares/verifyauth")
const multer  = require('multer');
const { distinct } = require("../models/cource.model");

// handle the image upload  from  uers 
const deststorage = multer.diskStorage({

    destination:function(req , file ,cb){
        cb(null , "upload")
    },
    filename:function(req , file ,cb){
        const ext = file.mimetype.split("/")[1];
        const filen = `user-${Date.now()}.${ext}`
        cb(null , filen)

    }
}
)

const fileFilter = (req , file ,cb)=>{
    const imgetype = file.mimetype.split("/")[0];
    if (imgetype == "image") {
        return cb(null, true)       
    }else{
        return cb("must be a image", false)
    }
}

const upload = multer(
    { 
    storage: deststorage ,
    fileFilter
})


router.route('/')
.get(verifyauth , userController.getalluser)




router.route('/register')
.post(upload.single("avatar") , userController.register)


router.route('/login')
.post(userController.login)

module.exports = router ;
