// routes/userRoutes.js
const express = require('express');
const { SaveUsersDetails, fetchAllUsers, fetchUsersBasedOnId, updateUserDetails, deleteUser } = require('../controllers/userControllers');
const validateUser = require('../db/config');

const router = express.Router();

router.post('/user', validateUser, SaveUsersDetails);

router.get('/users', fetchAllUsers);

router.get('/user/:id', fetchUsersBasedOnId);
router.put("/user/:id", validateUser, updateUserDetails)
router.delete("/user/:id", deleteUser)


module.exports = router;
