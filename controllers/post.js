const Post = require('../models/post');
module.exports = {
    find: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.json(posts)
            })
            .catch(err => {
                next(err)
            })
    },
    findById: (req, res, next) => {
        Post.findById(req.params.id)
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                next(err)
            })
    },
    findByMillestoneId: (req, res, next) => {
        Post.find({
            MillestoneId: req.params.idMillestone
        })
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                next(err)
            })
    },
    update: (req, res, next) => {
        Post.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
        }, { new: true })
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                next(err)
            })
    },
    create: (req, res, next) => {
        Post.create({
            post: req.body.post,
            UserId: req.decodeduser._id,
            TaskId: req.decodedtask._id,
            MillestoneId: req.body.MillestoneId,
            description: req.body.description,
        })
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                next(err)
            })
    },
    destroy: (req, res, next) => {
        Post.findByIdAndRemove(req.params.id)
            .then(post => {
                res.json(post)
            }).catch(err => {
                next(err)
            })
    }
}
