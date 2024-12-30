/*
 *   The controller for handling the form submission
*/

const Profile = require('../models/profileModel');  //imports the profile model
const User = require('../models/userModel');  //imports the user model

//form controller which contains the logic for receiving the form data to be stored in profile collection
exports.form = async (req, res) => {
    try {
        const { contactInfo, summary, experience, education, skills, projects, certifications, publications, awards, languages, volunteerExps, interests } = req.body;

        if (!contactInfo) {
            return res.status(400).json({
                success: false,
                message: 'Missing informataion'
            });
        }

        // Check if a profile image was uploaded
        let profileImagePath = '';
        if (req.file) {
            profileImagePath = req.file.filename; // filename of the stored image
        }

        // Parse the JSON fields, if they're present
        const parsedContactInfo = JSON.parse(contactInfo);
        const parsedExperience = experience ? JSON.parse(experience) : [];
        const parsedEducation = education ? JSON.parse(education) : [];
        const parsedSkills = skills ? JSON.parse(skills) : [];
        const parsedProjects = projects ? JSON.parse(projects) : [];
        const parsedCertifications = certifications ? JSON.parse(certifications) : [];
        const parsedPublications = publications ? JSON.parse(publications) : [];
        const parsedAwards = awards ? JSON.parse(awards) : [];
        const parsedLanguages = languages ? JSON.parse(languages) : [];
        const parsedVolunteerExps = volunteerExps ? JSON.parse(volunteerExps) : [];
        const parsedInterests = interests ? JSON.parse(interests) : [];

        // Create a new profile instance with the form data
        const newProfile = new Profile({
            userId: req.user.id,
            firstName: parsedContactInfo.firstName,
            lastName: parsedContactInfo.lastName,
            email: parsedContactInfo.email,
            phoneNumber: parsedContactInfo.phoneNumber,
            location: parsedContactInfo.location,
            linkedIn: parsedContactInfo.linkedIn,
            profileImage: profileImagePath,
            summary: summary,
            experience: parsedExperience,
            education: parsedEducation,
            skills: parsedSkills,
            projects: parsedProjects,
            certifications: parsedCertifications,
            publications: parsedPublications,
            awards: parsedAwards,
            languages: parsedLanguages,
            volunteer: parsedVolunteerExps,
            interests: parsedInterests
        });

        newProfile.save();

        await User.findOneAndUpdate(
            {_id: req.user.id},
            {$set: {profileCreated: true}},
            {new: true, runValidators: true}
        );

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