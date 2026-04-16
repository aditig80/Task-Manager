const express = require('express');
const router = express.Router();
const {
  createTask, getAllTasks, getTaskById, updateTask, deleteTask,
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validator');

// All task routes are protected
router.use(protect);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;