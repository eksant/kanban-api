var express = require('express');
var router = express.Router();

//exporting controllers
var category = require('../controllers/category')

//middleware
var authenticationTask = require('../middleware/authenticationTask')
var authorizationTask = require('../middleware/authorizationTask')

router.get('/', category.find)

router.get('/task',authorizationTask, category.findByTaskId)

router.get('/:id', category.findById)
router.post('/',authorizationTask,authenticationTask, category.create)
router.put('/:id',authorizationTask,authenticationTask, category.update)
router.delete('/:id',authorizationTask,authenticationTask, category.destroy)

module.exports = router;