const joi = require('joi');

const Joi = require('joi');

module.exports.projectSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'string.max': `"name" should have a maximum length of {#limit}`,
        'any.required': `"name" is a required field`
    }),
    description: Joi.string().min(10).max(500).required().messages({
        'string.base': `"description" should be a type of 'text'`,
        'string.empty': `"description" cannot be an empty field`,
        'string.min': `"description" should have a minimum length of {#limit}`,
        'string.max': `"description" should have a maximum length of {#limit}`,
        'any.required': `"description" is a required field`
    }),
    budget: Joi.number().greater(0).required().messages({
        'number.base': `"budget" should be a type of 'number'`,
        'number.greater': `"budget" should be greater than 0`,
        'any.required': `"budget" is a required field`
    }),
    status: Joi.string().required().valid('Not Started', 'In Progress', 'Completed').required().messages({
        'string.base': `"status" should be a type of 'text'`,
        'string.empty': `"status" cannot be an empty field`,
        'any.required': `"status" is a required field`,
        'any.only': `"status" must be one of ['Not Started', 'In Progress', 'Completed']`
    }),
    startDate: Joi.date().iso().required().messages({
        'date.base': `"startDate" should be a valid date`,
        'any.required': `"startDate" is a required field`
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.base': `"endDate" should be a valid date`,
        'date.greater': `"endDate" must be greater than the start date`,
        'any.required': `"endDate" is a required field`
    })
});
