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
    location: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    summary: {
        type: String,
    },
    experience: [{
        id: {
            type: String,
        },
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
        id: {
            type: String,
        },
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
    skills: [{
        id: {
            type: String,
        },
        name: {
            type: String
        }
    }],
    projects: [{
        id: {
            type: String,
        },
        title: {
            type: String
        },
        achievements: {
            type: String
        }
    }],
    certifications: [{
        id: {
            type: String,
        },
        title: {
            type: String
        },
        organisation: {
            type: String
        },
        dateEarned: {
            type: Date
        }
    }],
    publications: [{
        id: {
            type: String,
        },
        title: {
            type: String
        },
        datePublished: {
            type: String
        },
        link: {
            type: String
        },
        description: {
            type: String
        }
    }],
    awards: [{
        id: {
            type: String,
        },
        title: {
            type: String
        },
        organisation: {
            type: String
        },
        dateAwarded: {
            type: String
        },
        description: {
            type: String
        }
    }],
    languages: [{
        id: {
            type: String,
        },
        language: {
            type: String
        }
    }],
    volunteer: [{
        id: {
            type: String,
        },
        position: {
            type: String
        },
        organisation: {
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        responsibilities: {
            type: String
        }
    }],
    interests: [{
        id: {
            type: String,
        },
        interest: {
            type: String
        }
    }]
});

const Profile = mongoose.model('Profile', profileSchema);   //converts the schema into a model

module.exports = Profile;  //exports the model