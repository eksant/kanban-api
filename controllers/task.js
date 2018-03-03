const Task = require('../models/task');
const Category = require('../models/category');
const Millestone = require('../models/millestone');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
module.exports = {
  find:(req,res,next)=>{
    Task.find()
      .then(tasks=>{
        res.json(tasks)
      })
      .catch(err=>{
        next(err)
      })
  },
  findById:(req,res,next)=>{
    Task.findById(req.params.id)
      .populate(['UserId','UserCreatedId'])
      .then(task=>{ 
        var tokentask = null
        if(task.UserCreatedId._id==req.decodeduser._id){
          tokentask = jwt.sign({
             task:{
              role:0,
              detail: task
             }
           }, process.env.secretJwtTask)
           //admin task
        }else{
          tokentask = jwt.sign({
            task:{
              role:1,
              detail: task
            }
          }, process.env.secretJwtTask)
          //notAdmin task
        }
        Category.find({
          TaskId:task._id
        }).then(categories=>{
          Millestone.find({
            TaskId:task._id
          })
          .populate(['UserId'])
          .then(millstones=>{
            Post.find({
              TaskId:task._id
            })
            .populate(['UserId'])
            .then(posts=>{
              res.send({
                task,
                categories,
                millstones,
                posts,
                tokentask
              })
            })
            .catch(err=>{
              next(err)
            })
          })
          .catch(err=>{
            next(err)
          })
        })
        .catch(err=>{
          next(err)
        })
      })
      .catch(err=>{
        next(err)
      })
  },
  findByUserId:(req,res,next)=>{
    Task.find({
      UserId : {
        $all : req.decodeduser._id 
      }
    })
    .then(tasks=>{
      res.json(tasks)
    })
    .catch(err=>{
      next(err)
    })
  },
  create:(req,res,next)=>{
    Task.create({
      name: req.body.name,
      description: req.body.description,
      UserCreatedId: req.decodeduser._id,
      UserId : req.decodeduser._id
    })
    .then(task=>{
      console.log('sadsd');
      Category.create({
        name: 'Open',
        TaskId: task._id
      })
      .then(category=>{
        Category.create({
          name: 'Process',
          TaskId: task._id
        })
        .then(category=>{
          Category.create({
            name: 'Close',
            TaskId: task._id
          })
          .then(category=>{
            res.json(task)
          })
          .catch(err=>{
            next(err)
          })
        })
        .catch(err=>{
          next(err)
        })
      })
      .catch(err=>{
        next(err)
      })
    })
    .catch(err=>{
      next(err)
    })
  },
  update:(req,res,next)=>{
    Task.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      description: req.body.description
    })
    .then(task=>{
      res.json(task)
    })
    .catch(err=>{
      next(err)
    })
  },
  invite:(req,res,next)=>{
    Task.findByIdAndUpdate(req.params.id,{
      $push :{
        UserId : req.body.UserId
      }
    })
    .then(task=>{
      res.json(task)
    })
    .catch(err=>{
      next(err)
    })
  },
  uninvite:(req,res,next)=>{
    Task.findByIdAndUpdate(req.params.id,{
      $pull :{
        UserId : req.body.UserId
      }
    },{new:true})
    .then(task=>{
      res.json(task)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    Task.findByIdAndRemove(req.params.id)
    .then(task=>{
      Category.remove({
        TaskId:req.params.id
      })
      .then(()=>{
        Millestone.remove({
          TaskId:req.params.id
        })
        .then(()=>{
          Post.remove({
            TaskId:req.params.id
          })
          .then(()=>{
            res.json(task)
          }).catch(err=>{
            next(err)
          })
        }).catch(err=>{
          next(err)
        })
      }).catch(err=>{
        next(err)
      })
    }).catch(err=>{
      next(err)
    })
  }
}
