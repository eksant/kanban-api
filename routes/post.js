var express = require('express');
var router = express.Router();

//exporting controllers
var post = require('../controllers/post')
var authorizationTask = require('../middleware/authorizationTask')

router.get('/', post.find)

router.get('/millestone/:idMillestone', post.findByMillestoneId)

router.get('/:id',authorizationTask, post.findById)
router.post('/',authorizationTask, post.create)
router.put('/:id',authorizationTask, post.update)
router.delete('/:id',authorizationTask, post.destroy)

module.exports = router;