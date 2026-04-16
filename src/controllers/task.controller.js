const Task = require('../models/task.model');

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, status } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      status: status || 'pending',
      userId: req.user.id,
    });

    return res.status(201).json({ status: 'success', data: task });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ status: 'success', count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found.' });
    }

    // Ownership check
    if (task.userId !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'Forbidden. You do not own this task.' });
    }

    return res.status(200).json({ status: 'success', data: task });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found.' });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'Forbidden. You do not own this task.' });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ status: 'success', data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found.' });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'Forbidden. You do not own this task.' });
    }

    await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json({ status: 'success', message: 'Task deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };