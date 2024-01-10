const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
            order: [[Task, 'priority', 'DESC'],[Task, 'due_date', 'ASC']]
        });

        const user = userData.get({ plain: true });
        console.log('------HOMEPAGE HERE--------');
        console.log(user);

        res.render('homepage', {
            ... user,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/task/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id);

        const task = taskData.get({ plain: true });
        console.log(task);

        res.render('task', {
            task,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id);

        const task = taskData.get({ plain: true });
        console.log(task);

        res.render('edit', {
            ...task,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/highPriority', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Task,
                where: { priority: true },
            }],
            order: [[Task, 'due_date', 'ASC']]
        });

        const user = userData.get({ plain: true });
        console.log('------HIGH PRIORITY HERE--------');
        console.log(user);

        res.render('highPriority', {
            ...user,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/lowPriority', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Task,
                where: { priority: false },
            }],
            order: [[Task, 'due_date', 'ASC']]
        });

        const user = userData.get({ plain: true });
        console.log('------LOW PRIORITY HERE--------');
        console.log(user);

        res.render('lowPriority', {
            ...user,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dueSoon', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
            order:[[Task, 'due_date', 'ASC']]
        });

        const user = userData.get({ plain: true });
        console.log('------DUE SOON HERE--------');
        console.log(user);

        res.render('dueSoon', {
            ...user,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
