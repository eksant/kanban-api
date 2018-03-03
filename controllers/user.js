const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  find:(req,res,next)=>{
    User.find()
      .then(users=>{
        res.json(users)
      })
      .catch(err=>{
        next(err)
      })
  },
  findById:(req,res,next)=>{
    User.findById(req.params.id)
      .then(user=>{
        res.json(user)
      })
      .catch(err=>{
        next(err)
      })
  },
  update:(req,res,next)=>{
    User.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      role: req.body.role||1
    },{new:true})
    .then(user=>{
      if(req.body.password){
        user.password=bcrypt.hashSync(req.body.password)
        user.save()
      }
      res.json(user)
    })
    .catch(err=>{
      next(err)
    })
  },
  create:(req,res,next)=>{
    User.create({
      name: req.body.name,
      email: req.body.email,
      password:bcrypt.hashSync(req.body.password),
      role: req.body.role || 1
    })
    .then(user=>{
      res.json(user)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    User.findByIdAndRemove(req.params.id)
    .then(user=>{
      res.json(user)
    }).catch(err=>{
      next(err)
    })
  }

}
