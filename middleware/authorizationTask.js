const jsonwebtoken = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jsonwebtoken.verify(req.headers.tokentask, process.env.secretJwtUser)
  if(decoded.name!=='JsonWebTokenError'){
    req.decodedtask=decoded.task.detail
    next()
  }else{
    next({
      message: 'maaf data tidak ada'
    })
  }
}