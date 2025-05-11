// validators/userValidator.js
const { body } = require('express-validator');
const {pool} = require('../db/db'); 

const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be at most 100 characters long'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      const { rows } = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
      console.log(rows)
      if (rows.length > 0) {
        throw new Error('Email already exists');
      }
    }),

  body('age')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Age must be a non-negative integer'),

  body('mobile')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid mobile number'),

  body('interest')
    .optional()
    .isArray()
    .withMessage('Interest must be an array of strings'),
];

module.exports = validateUser;
