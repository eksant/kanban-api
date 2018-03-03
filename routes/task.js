var express = require('express');
var router = express.Router();

//exporting controllers
var task = require('../controllers/task')

//middleware
var authenticationTask = require('../middleware/authenticationTask')
var authorizationTask = require('../middleware/authorizationTask')
var authorization = require('../middleware/authorization')

router.get('/', task.find)

router.get('/user/:id', task.findByUserId)
router.put('/invite/:id',authorizationTask,authenticationTask, task.invite)
router.put('/uninvite/:id',authorizationTask,authenticationTask, task.uninvite)

router.get('/:id', task.findById)
router.post('/', task.create)
router.put('/:id',authorizationTask,authenticationTask, task.update)
router.delete('/:id',authorizationTask,authenticationTask, task.destroy)

module.exports = router;