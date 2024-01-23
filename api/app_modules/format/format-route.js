const express = require('express')
const controller = require('./format-controller')
const router = express.Router()

router.post('/', controller.getAll)

module.exports = router