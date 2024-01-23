const express = require('express');
const upload = require('../../middleware/upload')
const controller = require('./unit_controller')
const passport = require("passport");
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.post('/:id', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router