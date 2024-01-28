const express = require('express');
const router = express.Router();
const controller = require('./sheetMaterials_controller')

router.get('/', controller.getAll)
router.post('/', controller.create)
router.put('/:id', controller.update)

module.exports = router