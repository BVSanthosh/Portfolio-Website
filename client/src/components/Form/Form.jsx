import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConatctForm from './ContactForm.jsx';
import EducationForm from './EducationForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import SkillsForm from './SkillsForm.jsx';
import SumaryForm from './SummaryForm.jsx';

function Form() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [contactInfo, setContactInfo] = useState({
        fullName: '',  
        email: '',
        phoneNumber: '',  
        linkedin: '',
    });

    const [summary, setSummary] = useState('');

    const [experiences, setExperiences] = useState([]);

    const [educations, setEducations] = useState([]);

    const [skills, setSkills] = useState([]);

    const formData = {
        contactInfo: contactInfo,
        summary: summary,
        experience: experiences,
        education: educations,
        skills: skills
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;

        setContactInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    }

    const handleExperienceChange  = (index, updatedExperience) => {
        const newExperiences = [...experiences];
        newExperiences[index] = updatedExperience; 
        setExperiences(newExperiences);
    };
    
    const handleAddExperience = (newExperience) => {
        setExperiences([
            ...experiences,
            newExperience
        ]);
    };

    const handleEducationChange = (index, updatedEducation) => {
        const newEducations = [...educations]
        newEducations[index] = updatedEducation;
        setEducations(newEducations);
    };

    const handleAddEducation = (newEducation) => {
        setEducations([
            ...educations,
            newEducation
        ]);
    };

    const handleSkillChange = (index, updatedSkill) => {
        const newSkills = [...skills];
        newSkills[index] = updatedSkill;
        setSkills(newSkills);
    }

    const handleAddSkill = (newSkill) => {
        setSkills([
            ...skills,
            newSkill
        ]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const response = axios.post('http://localhost:5000/api/v1/user/formfillup', formData); 

            if (response.data.success) {
                console.log('Form filled up successfully:', response.data);
                navigate('/profile');
            } else {
                setErrorMessage('Form fill up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error filling up form:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="container mt-5">
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <hr />
                <ConatctForm handleContactChange={handleContactChange}/>
                <SumaryForm handleSummaryChange={handleSummaryChange}/>
                <ExperienceForm experiences={experiences} handleExperienceChange={handleExperienceChange} handleAddExperience={handleAddExperience}/>
                <EducationForm educations={educations} handleEducationChange={handleEducationChange} handleAddEducation={handleAddEducation}/>
                <SkillsForm skills={skills} handleSkillChange={handleSkillChange} handleAddSkill={handleAddSkill}/>
                <hr />
                <button type="submit" className="btn btn-primary">Generate Profile</button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </form>
            <p>Contact Info: {JSON.stringify(contactInfo, null, 2)}</p>
            <p>Summary: {JSON.stringify(summary, null, 2)}</p>
            <p>Experience: {JSON.stringify(experiences, null, 2)}</p>
            <p>Education: {JSON.stringify(educations, null, 2)}</p>
            <p>Skills: {JSON.stringify(skills, null, 2)}</p>
        </div>
    );
}

export default Form;