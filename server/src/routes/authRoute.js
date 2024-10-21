/*
 * Contains the route handlers for authentication (login and signup)
*/

const express = require('express');
const router = express.Router();   //gets the router for login and signup end-points

const { signup, login } = require('../controllers/authController');  //imports the controllers to handle user authentication requests

router.post('/signup', signup);  //route handler for the signup functionality
router.post('/login', login);  //route handler for the login functionality

module.exports = router;  //exports the route handlers