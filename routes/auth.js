var express = require('express');
var router = express.Router();

//exporting controllers
var auth = require('../controllers/auth')

//middleware
var facebook = require('../middleware/facebook')


router.post('/', auth.signin)
router.post('/fb',facebook, auth.fbsignin)

module.exports = router;