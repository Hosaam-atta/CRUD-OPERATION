module.exports = (...role)=>{ 
    console.log(role);
    
    return (req , res ,next)=>{
    if (!role.includes(req.currentuser.role)) {
        return next(res.status(401).json({mass:"you must be a manger"}));
        };
        next();
    }


    }
