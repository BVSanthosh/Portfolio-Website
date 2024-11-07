/**
 * Portfolio Component
 */
import axios from 'axios';
import { useState, useEffect } from 'react';

import PortfolioAbout from './PortfolioAbout.jsx';
import PortfolioEducation from './PortfolioEducation.jsx';
import PortfolioExperience from './PortfolioExperience.jsx';
import PortfolioNav from './PortfolioNav.jsx';
import PortfolioSkills from './PortfolioSkills.jsx';

function PortfolioPage() {
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/portfolio');
                console.log(response.data.data.experience);

                if (response.data.success) {
                    const contact = {
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                        email: response.data.data.email,
                        phoneNumber: response.data.data.phoneNumber,
                        location: response.data.data.location,
                        linkedIn: response.data.data.linkedIn
                    };
                    setContactInfo(contact);
                    setAbout(response.data.data.summary);
                    setExperience(response.data.data.experience);
                    setEducation(response.data.data.education);
                    setSkills(response.data.data.skills);
                } else {
                    console.error('Failed to fetch user data. Please try again.');
                }
            } catch(error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            }
        }

        fetchPortfolioData();
    }, []);

    const [contactInfo, setContactInfo] = useState({});
    const [about, setAbout] = useState('');
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);

    const [nextExpId, setNextExpId] = useState(0);
    const [nextEduId, setNextEduId] = useState(0);
    const [nextSkillId, setNextSkillId] = useState(0);

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleExperienceChange  = (updatedExperience) => {
        setExperience(prevExperience => prevExperience.map(exp => exp.id == updatedExperience.id ? updatedExperience : exp));
    };

    const handleAddExperience = () => {
    
        setExperience([
            ...experience,
            {
                id: nextExpId,
                jobTitle: '',
                companyName: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]);

        setNextExpId(nextExpId => nextExpId + 1);
    };

    const handleRemoveExperience = (exp) => {
        setExperience(experience.filter(e => e.id !== exp.id));
    };

    const handleEducationChange = (updatedEducation) => {
        setEducation(prevEducation => prevEducation.map(edu => edu.id == updatedEducation.id ? updatedEducation : edu));
    };

    const handleAddEducation = () => {
        setEducation([
            ...education,
            {
                id: nextEduId,
                qualification: '',
                institutionName: '',
                location: '',
                startDate: '',
                endDate: '',
                achievements: ''
            }
        ]);

        setNextEduId(nextEduId => nextEduId + 1);
    };

    const handleRemoveEducation = (edu) => {
        setEducation(education.filter(e => e.id !== edu.id));
    };

    const handleSkillChange = (updatedSkill) => {
        setSkills(prevSkills => prevSkills.map(skill => skill.id == updatedSkill.id ? updatedSkill : skill));
    };

    const handleAddSkill = () => {
        setSkills([
            ...skills,
            {
                id: nextSkillId,
                name: ''
            }
        ]);

        setNextSkillId(nextSkillId => nextSkillId + 1);
    }

    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(s => s.id !== skill.id));
    };

    return (
        <>
            <PortfolioNav name={contactInfo.firstName + " " + contactInfo.lastName}/>
            <br />
            <PortfolioAbout about={about} contact={contactInfo} handleAboutChange={handleAboutChange}/>
            <br />
            <PortfolioExperience experience={experience} handleExperienceChange={handleExperienceChange} handleAddExperience={handleAddExperience} handleRemoveExperience={handleRemoveExperience}/>
            <br />
            <PortfolioEducation education={education} handleEducationChange={handleEducationChange} handleAddEducation={handleAddEducation} handleRemoveEducation={handleRemoveEducation}/>
            <br />
            <PortfolioSkills skills={skills} handleSkillChange={handleSkillChange} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill}/>
            <br />
        </>
    );
}

export default PortfolioPage;