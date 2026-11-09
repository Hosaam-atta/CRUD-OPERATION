const jwt = require("jsonwebtoken");
const  httpstatus = require("../utils/httpstatus")

const verifyauth = (req , res , next)=>{

    const authheader =req.headers["Authorization"] || req.headers["authorization"];
    if (!authheader) {
        res.status(401).json({mass:"token is require"})
    }

   try{
     const currentuser= jwt.verify(authheader , process.env.TOKEN_SECRIT_KEY)
     req.currentuser = currentuser ;
     
     next();
   }catch(e){
    res.status(401).json({success:httpstatus.Fail ,mass:e.message })
   }


}

module.exports= verifyauth;