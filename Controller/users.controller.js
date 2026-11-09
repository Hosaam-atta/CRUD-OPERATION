const mongoose = require('mongoose');
const users =require('../models/user.model')
const handdleAsyncfn = require("../middlewares/handelerror");
const { success } = require('../utils/httpstatus');
const bcrypt = require("bcryptjs")
const httpstatus = require('../utils/httpstatus')
const generatJWT = require("../utils/generat.JWT");



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
    async (req ,  res , next)=>{
    const {firstName ,lastName ,email ,password , role} = new users(req.body)
    const olduser =await users.findOne({email:email})
    if(olduser){
        res.status(400).json({success:"faild",massage:"The Email Is already exit or dublicated"})
    }
    
    const hashpassword = await bcrypt.hash(password , 10)


    
    const user = new users({
        firstName
        ,lastName
        ,email
        ,password:hashpassword  
        ,role 
})

        const userJwt = await generatJWT({email:user.email , id:user._id , role:user.role})
        user.token = userJwt;

        await user.save();

    res.status(201).json({success:"true" , data:{user}})
   
     
}
)

const login = handdleAsyncfn( 
    async (req ,  res )=>{
        const {email , password} = req.body;

        const user = await users.findOne({email:email});
        if(!user){
            res.status(400).json({ success:httpstatus.Fail ,massage:"User Is Not Found "})
        } 

        const compareuser = await bcrypt.compare(password , user.password);

        if(user && compareuser){
            const token = await generatJWT({email:user.email , id:user._id , role:user.role})
            res.status(200).json({  status:httpstatus.success ,massage:{token}})
        }else{
            res.status(200).json({ success:httpstatus.Fail ,massage:"password not currect "})
        }
    
     
}
)


module.exports= {
    getalluser,
    register,
    login
}