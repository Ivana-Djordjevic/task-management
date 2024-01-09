const router = require('express').Router();
const { Task, Notification } = require('../../models');
const withAuth = require('../../utils/auth');

const scheduleEmail = async (dueDate, emailDetails) => {
    const currentTime = new Date().getTime();
    const dayBefore = 24*60*60*1000
    const dueTime = new Date(new Date(dueDate).getTime()-dayBefore)
    const timeDifference = dueTime - currentTime;
    console.log('due time: ' , new Date(dueTime))
    console.log(timeDifference)
    try {
        const notification = await Notification.create({
            due_date: dueTime,
            details: JSON.stringify(emailDetails)
        })
        console.log(notification)   
    }
    catch (err) {
        console.log(err)
    }
};

// POST route to add task
router.post('/', withAuth, async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
        console.log(newTask)

        const emailDetails = {
        to: req.session.email,
        subject: 'Task Due Reminder',
        text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`,
        };

        await scheduleEmail(newTask.due_date, emailDetails);

        res.json(newTask);
    } catch (err) {
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