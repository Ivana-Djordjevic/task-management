const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/auth');

// GET route to retrieve all tasks
router.get('/task', withAuth, async (req, res) => {
    try {
        const task = await Task.findAll();
        res.json(task);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// GET route to retrieve a single task by ID
router.get('/task/:id', withAuth, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to add task
router.post('/task', withAuth, async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
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