const express = require('express');
const router = express.Router();

const controller = require('../controllers/inbox.controller');

router.post('/add', controller.add);
router.delete('/delete/:id', controller.delete);
router.get('/list', controller.list);
router.get('/get/:id', controller.get);

module.exports = router;