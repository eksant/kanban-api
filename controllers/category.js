const Category = require('../models/category');

module.exports = {
  find:(req,res,next)=>{
    Category.find()
      .then(categories=>{
        res.json(categories)
      })
      .catch(err=>{
        next(err)
      })
  },
  findById:(req,res,next)=>{
    Category.findById(req.params.id)
      .then(category=>{
        res.json(category)
      })
      .catch(err=>{
        next(err)
      })
  },
  findByTaskId:(req,res,next)=>{
    Category.find({
        TaskId: req.decodedtask._id
    })
      .then(category=>{
        res.json(category)
      })
      .catch(err=>{
        next(err)
      })
  },
  update:(req,res,next)=>{
    Category.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
    },{new: true})
    .then(category=>{
      res.json(category)
    })
    .catch(err=>{
      next(err)
    })
  },
  create:(req,res,next)=>{
    Category.create({
      name : req.body.name,
      TaskId: req.decodedtask._id
    })
    .then(category=>{
      res.json(category)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
      res.json(category)
    }).catch(err=>{
      next(err)
    })
  }
}
