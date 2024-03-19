const router = require('express').Router();
const { Task, Notification } = require('../../models');
const withAuth = require('../../utils/auth');

const scheduleEmail = async (dueDate, emailDetails) => {
    // const currentTime = new Date().getTime();
    // const dayBefore = 24*60*60*1000;
    // let dueTime;
    // dueTime = new Date(new Date(dueDate).getTime()-dayBefore).getTime();
    // let timeDifference;
    // if(new Date(dueDate).getTime() <= currentTime + dayBefore) {
    //     timeDifference = 30000 // new Date(dueDate).getTime();
    // } else {
    //      timeDifference = dueTime - currentTime;
    // }
    // console.log('due time: ' , new Date(dueTime));
    // console.log(timeDifference);
    try {
        const notification = await Notification.create({
            due_date: dueDate,
            details: JSON.stringify(emailDetails)
        });
        console.log(notification);
    } catch (err) {
        console.log(err);
    }
};

// POST route to add task
router.post('/', withAuth, async (req, res) => {
    try{
        const { name, description, notification, priority, due_date } = req.body;
        const newTask = await Task.create({
            name: name,
            description: description,
            notification: notification,
            priority: priority === 'high' ? true : false,
            due_date: due_date,
            user_id: req.session.user_id
        });
        const emailDetails = {
            to: req.session.email,
            subject: 'Task Due Reminder',
            text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`,
        };

        await scheduleEmail(newTask.due_date, emailDetails);

        res.json(newTask);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// PUT route to update a task by ID
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const updateTask = await Task.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(updateTask);
    } catch (err) {
        console.log(err);
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