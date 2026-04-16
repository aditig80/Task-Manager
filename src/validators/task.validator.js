const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'any.required': 'Title is required',
  }),
  description: Joi.string().optional().allow(''),
  dueDate: Joi.date().iso().required().messages({
    'date.format': 'Due date must be a valid ISO date (YYYY-MM-DD)',
    'any.required': 'Due date is required',
  }),
  status: Joi.string().valid('pending', 'completed').optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).optional(),
  description: Joi.string().optional().allow(''),
  dueDate: Joi.date().iso().optional(),
  status: Joi.string().valid('pending', 'completed').optional(),
}).min(1).messages({
  'object.min': 'At least one field is required to update',
});

module.exports = { createTaskSchema, updateTaskSchema };