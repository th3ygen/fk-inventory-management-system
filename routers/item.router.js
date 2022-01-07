const express = require('express');
const router = express.Router();

const controller = require('../controllers/item.controller')

// /items/
router.get('/list', controller.getItems);
router.get('/find', controller.getItem);
router.post('/add', controller.addItem);
router.post('/update', controller.updateItem);
router.get('/delete', controller.deleteItem);

module.exports = router;