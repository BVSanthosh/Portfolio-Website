/*
 * Contains the Model and Scheme for the user profile 
 */

const mongoose = require('mongoose');

//Schema for storing user profile data
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    linkedIn: {
        type: String,
    },
    summary: {
        type: String,
    },
    experience: [{
        jobTitle: {
            type: String,
        },
        companyName: {
            type: String,
        },
        location: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        achievements: {
            type: String,
        },
    }],
    education: [{
        qualification: {
            type: String,
        },
        institutionName: {
            type: String,
        },
        location: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        achievements: {
            type: String,
        },
    }],
    skills: {
        type: [String],
    }
});

const Profile = mongoose.model('Profile', profileSchema);   //converts the schema into a model

module.exports = Profile;  //exports the model