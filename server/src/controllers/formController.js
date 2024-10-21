/*
    Contains the controller for handling the form submission
*/

const Profile = require('../models/profileModel');  //imports the profile model

//form controller which contains the logic for receiving the form data to be stored in profile collection
exports.form = async (req, res) => {
    try {
        const { contactInfo, summary, experience, education, skills } = req.body;

        if (!contactInfo) {
            return res.status(400).json({
                success: false,
                message: 'Missing informataion'
            });
        }

        const newProfile = new Profile({
            userId: req.userId,
            firstName: contactInfo.firstName,
            lastName: contactInfo.lastName,
            email: contactInfo.email,
            phoneNumber: contactInfo.phoneNumber,
            linkedIn: contactInfo.linkedIn,
            summary: summary,
            experience: experience,
            education: education,
            skills: skills
        });

        newProfile.save();

        return res.status(201).json({
            success: true,
            message: 'Form data processed successfully',
        });
    } catch(error) {
        console.error(`Error processing form data: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while processing form data'
        });
    }
}