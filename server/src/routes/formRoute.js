/*
 * Contains the route handler for handling the form submission
*/

const express = require('express');
const router = express.Router();   //gets the router for handling form end-points

const { form } = require('../controllers/formController');  //gets the form controller 
const { authenticateToken } = require('../controllers/tokenAuthController');   //gets the JWT authentication middleware

router.post('/form-fillup', authenticateToken, form);   //route handler for the form submit functionality

module.exports = router;   //exports the route handler