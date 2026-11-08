const jwt = require("jsonwebtoken")

module.exports = async (payload)=>{
  const token = await jwt.sign
  (
    payload ,
     process.env.TOKEN_SECRIT_KEY ,
    {expiresIn:"60s"}
    )

  return token;
}