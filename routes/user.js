var express = require('express');
var router = express.Router();

//exporting controllers
var user = require('../controllers/user')

//middleware
var authorization = require('../middleware/authorization')
var authentication = require('../middleware/authentication')

router.get('/', user.find)
router.get('/:id', user.findById)
router.post('/', user.create)
router.put('/:id',authorization, authentication, user.update)
router.delete('/:id',authorization, authentication, user.destroy)

module.exports = router;