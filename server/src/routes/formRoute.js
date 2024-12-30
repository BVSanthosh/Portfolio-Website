/*
 * Contains the route handler for handling the form submission
 */

const express = require('express');
const router = express.Router();   // gets the router for handling form end-points

const { form } = require('../controllers/formController');  // gets the form controller
const { authenticateToken } = require('../controllers/tokenAuthController');   // gets the JWT authentication middleware

// The formRoute now accepts the `upload` middleware passed from server.js
module.exports = (upload) => {
    router.post('/form-fillup', authenticateToken, upload.single('profileImage'), form);  // route handler for the form submit functionality

    return router;  // return the router with the new route configured
};