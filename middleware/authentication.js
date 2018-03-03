module.exports = (req,res,next)=>{
    if(req.decodeduser.role==0){
        next()
    }else if(req.decodeduser._id==req.params.id){
        next()
    }else{
        next({
            message:'Permession denied'
        })
    }
}