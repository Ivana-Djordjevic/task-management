const router = require('express').Router();
const userRoutes = require('./userRoutes');
const notificationRoutes = require('./notificationRoutes');
const taskRoutes = require('./taskRoutes');
router.get('/', (req, res) => {
    res.send('working')
})

router.use('/users', userRoutes);

module.exports = router;
