const express = require('express');
const router = express.Router();
const taskController = require('./taskController');

router.use('/api', taskController);

module.exports = router;