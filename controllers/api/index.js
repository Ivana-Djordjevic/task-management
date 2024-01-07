const router = require('express').Router();
const userRoutes = require('./userRoutes');
const notificationRoutes = require('./notificationRoutes')

router.use('/users', userRoutes);
// router.use('/notification', notificationRoutes);

module.exports = router;
