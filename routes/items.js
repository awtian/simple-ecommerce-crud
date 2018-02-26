const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items')

/* GET users listing. */
router.get('/', itemController.getAll);
router.get('/search/:query', itemController.search);
router.get('/:cate', itemController.getCate);
router.post('/', itemController.create);
router.get('/:id', itemController.getOne);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);


module.exports = router;