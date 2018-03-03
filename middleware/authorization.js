const jsonwebtoken = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jsonwebtoken.verify(req.headers.tokenuser, process.env.secretJwtUser)
  if(decoded){
    req.decodeduser=decoded.user
    next()
  }else{
    next({
      message: 'maaf data tidak ada'
    })
  }
}