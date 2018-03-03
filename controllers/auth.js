const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signin : (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    var tokenuser = jwt.sign({ user }, process.env.secretJwtUser)
                    res.send({
                        message: "Login succeess",
                        user,
                        tokenuser
                    })
                } else {
                    next({
                        message: 'Login gagal'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    },
    fbsignin : (req,res,next)=>{
        User.findOne({'email':req.fb.email})
          .then(user=>{
            if(user){
              let token = jwt.sign({user}, process.env.secretjwt)
              res.send({
                message:'akun sudah ada',
                user,
                tokenuser:token,
              })
            }else{
              User.create({
                  email: req.fb.email,
                  name: req.fb.name,
                  image: req.fb.picture.data.url,
                  password: req.body.password,
                  role: 1
                })
                .then(userCreate =>{
                  user=userCreate
                  let token = jwt.sign({user}, process.env.secretjwt)
                  res.send({
                    message: 'add success',
                    user,
                    tokenuser:token
                  })
                })
                .catch(err => {
                  next(err)
                })
            }
          })
          .catch(err => {
            next(err)
          })
      }
}
