const express = require('express');

const router = express.Router();
const jobControllers = require('../controllers/jobs');
const verifyToken = require('../utils/verifyToken');

/* Controllers jobs on http://dev3.dansmultipro.co.id/api/recruitment/positions.json. */
router.use(verifyToken);
router.get('/', jobControllers.viewAll);
router.get('/:id', jobControllers.viewById);

module.exports = router;
