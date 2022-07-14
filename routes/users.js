const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/users');

/* Users routes */
router.get('/', userControllers.viewAll);
router.get('/:id', userControllers.viewById);
router.put('/:id', userControllers.editById);

module.exports = router;
