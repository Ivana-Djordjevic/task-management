const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');
const { scheduleEmail } = require('../../utils/nodemailer');


// POST route to add task
router.post('/', withAuth, async (req, res) => {
    try{
        const { name, description, notification, priority, due_date, user_id } = req.body;
        const newTask = await Task.create({
            name: name,
            description: description,
            notification: notification,
            priority: priority == "high" ? true : false,
            due_date: due_date,
            user_id: req.session.user_id
        });
        const emailDetails = {
        to: req.session.email,
        subject: 'Task Due Reminder',
        text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`,
        };

        scheduleEmail(newTask.due_date, emailDetails);
        
        res.json(newTask);
    } catch (err) {
        console.log(err)
            res.status(400).json(err);
    }
});

// PUT route to update a task by ID
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const updateTask = await Task.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(updateTask);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// DELETE route to delete task by ID
router.delete('/:id', withAuth, async (req, res) => {
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