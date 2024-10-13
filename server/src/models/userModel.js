/*
 * Contains the Model and Scheme for user credentials 
 */

const mongoose = require('mongoose');

//Schema for storing user credentials
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);  //converts the schema into a model

module.exports = User;  //exports the model