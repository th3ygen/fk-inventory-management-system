const express = require('express');
const router = express.Router();

const controller = require ('../controllers/account.controller')

router.get('/get', controller.getAccounts);
router.get('/find', controller.getAccount);
router.post('/add', controller.addAccount);
router.post('/update', controller.updateAccount);
router.get('/delete', controller.deleteAccount);

module.exports = router;