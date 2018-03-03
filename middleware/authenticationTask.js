const jsonwebtoken = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jsonwebtoken.verify(req.headers.tokentask, process.env.secretJwtTask)
  if(decoded.task.role == 0){
    next()
  }else{
    next({
      message: 'maaf anda bukan admin task'
    })
  }
}