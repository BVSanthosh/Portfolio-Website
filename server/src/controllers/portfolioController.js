/**
 * The controller for receiving the user data for the portfolio page
 */

const Profile = require('../models/profileModel'); 

exports.portfolio = async (req, res) => {
    try {
        const userId = req.userId;
        const existingProfile = await Profile.findOne({ userId: userId });

        if (!existingProfile) {
            return res.status(404).json({
                success: false,
                message: 'Unable to find user profile'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved.',
            data: existingProfile
        });
    } catch(error) {
        console.error(`Error accessing user profile: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while retrieving user profile'
        });
    }
}

exports.updatePortfolio = async (req, res) => {
    try {
        const userId = req.userId;
        const { section, data } = req.body; 
        let updatedField;

        if (!section || !data) {
            return res.status(400).json({
                success: false,
                message: 'Missing data'
            });
        }

        switch (section) {
            case 'about':
                updatedField = {summary: data};
                break;
            case 'experience':
                updatedField = {experience: data};
                break;
            case 'education':
                updatedField = {education: data};
                break;
            case 'skills':
                updatedField = {skills: data};
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid section'
                }); 
        }

        const user = await Profile.findOneAndUpdate(
            {userId: userId},
            {$set: updatedField},
            {new: true, runValidators: true}
        );

        if (!user) {
            return res.status(404).status({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).status({
            success: true,
            message: `${section} section updated successfully`
        });
    } catch(error) {
        console.error(`Error updating user profile: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while updating user profile'
        });
    }
}