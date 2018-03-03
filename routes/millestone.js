var express = require('express');
var router = express.Router();

//exporting controllers
var millestone = require('../controllers/millestone')
var authenticationTask = require('../middleware/authenticationTask')
var authorizationTask = require('../middleware/authorizationTask')

router.get('/', millestone.find)

router.get('/category/:idCategory', millestone.findByCategoryId)

router.put('/category/:id', millestone.updateCategory)

router.get('/:id', millestone.findById)
router.post('/',authorizationTask, millestone.create)
router.put('/:id',authorizationTask, millestone.update)
router.delete('/:id',authorizationTask, millestone.destroy)

module.exports = router;