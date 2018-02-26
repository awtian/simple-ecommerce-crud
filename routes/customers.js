const express = require('express');
const router = express.Router();
const Controller = require('../controllers/customers')

/* GET users listing. */
router.get('/', Controller.getAll)
router.post('/', Controller.create)
router.post('/login', Controller.login)

module.exports = router;