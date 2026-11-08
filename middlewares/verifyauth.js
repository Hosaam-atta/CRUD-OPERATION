const jwt = require("jsonwebtoken");
const { success } = require("../utils/httpstatus");
const  httpstatus = require("../utils/httpstatus")

const verifyauth = (req , res , next)=>{

    const authheader =req.headers["Authorization"] || req.headers["authorization"];
    if (!authheader) {
        res.status(401).json({mass:"token is require"})
    }

   try{
     jwt.verify(authheader , process.env.TOKEN_SECRIT_KEY)
     next();
   }catch(e){
    res.status(401).json({success:httpstatus.Fail ,mass:e.message })
   }


}

module.exports= verifyauth;