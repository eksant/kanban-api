var express = require('express');
var router = express.Router();

//exporting api
var auth = require('./auth')
var user = require('./user')
var task = require('./task')
var category = require('./category')
var millestone = require('./millestone')
var post = require('./post')

//middleware
var authorization = require('../middleware/authorization')

//home
router.get('/', function (req, res, next) {
  res.send({
    message: 'Wellcome to api task management'
  });
});


router.use('/auth', auth)
router.use('/user', user)
router.use('/task', authorization, task)
router.use('/category', authorization, category)
router.use('/millestone', authorization, millestone)
router.use('/post', authorization, post)

module.exports = router;
