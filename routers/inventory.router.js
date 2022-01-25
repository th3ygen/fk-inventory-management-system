const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventory.controller')

// /inventory/
router.get('/item/list', controller.getItems);
router.get('/item/id/:id', controller.getItem);
router.delete('/item/delete/:id', controller.deleteItem);

router.post('/item/add', controller.addItem);
router.patch('/item/update', controller.updateItem);

router.get('/sold/list', controller.getSoldItems);
router.post('/sold/add', controller.addSoldItem);



module.exports = router;