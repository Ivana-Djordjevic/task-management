const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/auth');
const { scheduleEmail } = require('../../utils/nodemailer');

// POST route to add task
router.post('/task', withAuth, async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
        console.log(newTask)

        const emailDetails = {
        to: req.session.email,
        subject: 'Task Due Reminder',
        text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`,
        };

        scheduleEmail(newTask.due_date, emailDetails);

        res.json(newTask);
    } catch (err) {
            res.status(400).json(err);
    }
});

// PUT route to update a task by ID
router.put('/task/:id', withAuth, async (req, res) => {
    try {
        const updateTask = await Task.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(updateTask);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE route to delete task by ID
router.delete('/task/:id', withAuth, async (req, res) => {
    try {
        const deleteTask = await Task.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deleteTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;