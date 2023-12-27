const { Task } = require('../models')

const TaskData = [
    {
        "name": "Task 1",
        "description": "this is a test, the first one. a priority",
        "priority": true,
        "due_date": new Date ('2024-01-05'),
        "user_id": 1,
    },
    {
        "name": "Task 2",
        "description": "this is a test, the second one. not a priority",
        "priority": false,
        "due_date": new Date ('2024-01-10'),
        "user_id": 1,
    },
    {
        "name": "Task 3",
        "description": "this is a test, the third one. not a priority",
        "priority": false,
        "due_date": new Date ('2024-01-03'),
        "user_id": 1,
    },
    {
        "name": "Task 4",
        "description": "this is a test, the fourth one. a priority",
        "priority": true,
        "due_date": new Date ('2024-01-20'),
        "user_id": 1,
    },
    {
        "name": "Task 5",
        "description": "this is a test, the fifth one. a priority",
        "priority": true,
        "due_date": new Date ('2024-01-01'),
        "user_id": 1,
    },
];

const seedTasks = () => Task.bulkCreate(TaskData);

module.exports = seedTasks;