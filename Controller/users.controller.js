const mongoose = require('mongoose');
const users =require('../models/user.model')
const handdleAsyncfn = require("../middlewares/handelerror");
const { success } = require('../utils/httpstatus');

const getalluser = handdleAsyncfn( async ( req , res )=>{
    const query = req.query;
    console.log(query);
    
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page -1 ) * limit;

    const Allusers = await users.find().limit(limit).skip(skip)
    res.json({status:"success" , data : {Allusers}})

})

const register = handdleAsyncfn( 
    async (req ,  res )=>{
    const {firstName ,lastName ,email ,password} = new users(req.body)
    const olduser =await users.findOne({email:email})
    if(olduser){
        res.status(400).json({success:"faild",massage:"The Email Is already exit or dublicated"})
    }
    const user = new users({
        firstName
        ,lastName
        ,email
        ,password   })
    await user.save();

    res.status(201).json({success:"true" , data:{user}})
   
     
}
)

const login = async (req ,  res )=>{
    
     
}


module.exports= {
    getalluser,
    register,
    login
}