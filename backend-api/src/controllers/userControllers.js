// controllers/userControllers.js
const { validationResult } = require('express-validator');
const { pool } = require('../db/db');

const SaveUsersDetails = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, interest, age, mobile, email } = req.body;




    // Define the SQL INSERT query with parameter placeholders
    const insertQuery = `
      INSERT INTO users (name, interest, age, mobile, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    // Prepare the values array
    const values = [
      name || null,
      interest || null,
      age || null,
      mobile || null,
      email || null,
    ];
    console.log(values)

    // Execute the query
    const result = await pool.query(insertQuery, values)

    // Send the response with the newly created user
    return res.status(201).json({
      message: 'User added successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Error inserting user:', error);
    return res.status(400).json({
      message: 'Failed to add user',
      error: error.message,
    });
  }
};


const fetchAllUsers = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.name, u.interest, u.age, u.email
      FROM users u;
    `;

    const result = await pool.query(query);

    res.status(200).json({
      status: 'success',
      users: result.rows,
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};


const fetchUsersBasedOnId = async (req, res) => {
  try {
    const userID = req.params.id;

    const query = `
      SELECT u.id, u.name, u.interest, u.age, u.email, u.mobile
      FROM users u
      WHERE u.id = $1;
    `;

    const result = await pool.query(query, [userID]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
};

// controllers/userControllers.js
const updateUserDetails = async (req, res) => {
  try {
    const userID = req.params.id;
    const { name, interest, age, mobile, email } = req.body;

    // Check if the user exists
    const checkQuery = 'SELECT * FROM users WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [userID]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Update user details
    const updateQuery = `
      UPDATE users
      SET name = $1,
          interest = $2,
          age = $3,
          mobile = $4,
          email = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [name, interest, age, mobile, email, userID];
    const result = await pool.query(updateQuery, values);

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// controllers/userControllers.js
const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    // Check if the user exists
    const checkQuery = 'SELECT * FROM users WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [userID]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Delete user
    const deleteQuery = 'DELETE FROM users WHERE id = $1';
    await pool.query(deleteQuery, [userID]);

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};



module.exports = {
  SaveUsersDetails,
  fetchAllUsers,
  fetchUsersBasedOnId,
  updateUserDetails,
  deleteUser
};
