const Millestone = require('../models/millestone');
const Category = require('../models/category');
const Post = require('../models/post');
module.exports = {
    find: (req, res, next) => {
        Millestone.find()
            .then(millestones => {
                res.json(millestones)
            })
            .catch(err => {
                next(err)
            })
    },
    findById: (req, res, next) => {
        Millestone.findById(req.params.id)
            .then(millestone => {
                res.json(millestone)
            })
            .catch(err => {
                next(err)
            })
    },
    findByCategoryId: (req, res, next) => {
        Millestone.find({
            CategoryId: req.params.idCategory
        })
            .then(millestone => {
                res.json(millestone)
            })
            .catch(err => {
                next(err)
            })
    },
    update: (req, res, next) => {
        Millestone.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
        }, { new: true })
            .then(millestone => {
                res.json(millestone)
            })
            .catch(err => {
                next(err)
            })
    },
    updateCategory: (req, res, next) => {
        Millestone.findByIdAndUpdate(req.params.id, {
            CategoryId: req.body.CategoryId,
        }, { new: true })
            .then(millestone => {
                res.json(millestone)
            })
            .catch(err => {
                next(err)
            })
    },
    create: (req, res, next) => {
        Category.findOne({
            TaskId: req.decodedtask._id,
            name: 'Open'
        }).then(category => {
            Millestone.create({
                name: req.body.name,
                TaskId: req.decodedtask._id,
                UserId: req.decodeduser._id,
                CategoryId: category._id,
                description: req.body.description,
            })
                .then(millestone => {
                    res.json(millestone)
                })
                .catch(err => {
                    next(err)
                })
        })
            .catch(err => {
                next(err)
            })
    },
    destroy: (req, res, next) => {
        Millestone.findByIdAndRemove(req.params.id)
            .then(millestone => {
                Post.remove({
                    MillestoneId:req.params.id
                }).then(()=>{
                    res.json(millestone)
                })
                .catch(err => {
                    next(err)
                })
            }).catch(err => {
                next(err)
            })
    }
}
