/**
 * The form component
 */

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConatctForm from './ContactForm.jsx';   //imports the Contact Information section component  
import EducationForm from './EducationForm.jsx';   //imports the Education section component
import ExperienceForm from './ExperienceForm.jsx';   //imports the Experience section component
import SkillsForm from './SkillsForm.jsx';   //imports the skills section component
import SumaryForm from './SummaryForm.jsx';   //imports the summary section component

function Form() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [contactInfo, setContactInfo] = useState({   //state for managing the contact info section
        firstName: '',  
        lastName: '',
        email: '',
        phoneNumber: '',  
        linkedin: '',
    });
    const [summary, setSummary] = useState('');   //state for manging the summary section
    const [experiences, setExperiences] = useState([]);   //state for managing the experience section
    const [educations, setEducations] = useState([]);   //state for managing the education section
    const [skills, setSkills] = useState([]);   //state for managing the skills section
    const [nextExpId, setNextExpId] = useState(0);   //state for manging the id of each experience entry
    const [nextEduId, setNextEduId] = useState(0);   //state for manging the id of each education entry
    const [nextSkillId, setNextSkillId] = useState(0);   //state for manging the id of each skill entry

    const formData = {   //the entire form data passed as the body in a post request
        contactInfo: contactInfo,
        summary: summary,
        experience: experiences,
        education: educations,
        skills: skills
    };

    //event handler for updating the input fields in the contact info section
    const handleContactChange = (e) => {
        const { name, value } = e.target;

        setContactInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //event handler for updating textarea for the summary section
    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    }

    //event handler for updating the input fields of the experience section
    const handleExperienceChange  = (updatedExperience) => {
        setExperiences(prevExperience => prevExperience.map(exp => exp.id == updatedExperience.id ? updatedExperience : exp));
    };

    //event handler for adding an experience sub-section
    const handleAddExperience = () => {
    
        setExperiences([
            ...experiences,
            {
                id: nextExpId,
                jobTitle: '',
                companyName: '',
                location: '',
                startDate: '',
                endDate: '',
                achievements: ''
            }
        ]);

        setNextExpId(nextExpId => nextExpId + 1);
    };

    //event handler for removing an experience sub-section
    const handleRemoveExperience = (experience) => {
        setExperiences(experiences.filter(exp => exp.id !== experience.id));
    };

    //event handler for updating the input fields of the education section
    const handleEducationChange = (updatedEducation) => {
        setEducations(prevEducations => prevEducations.map(edu => edu.id == updatedEducation.id ? updatedEducation : edu));
    };

    //event handler for adding an education sub-section
    const handleAddEducation = () => {
        setEducations([
            ...educations,
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

    //event handler for removing an education sub-section
    const handleRemoveEducation = (education) => {
        setEducations(educations.filter(edu => edu.id !== education.id));
    };

    //event handler for updating the input fields of the skills sub-section
    const handleSkillChange = (updatedSkill) => {
        setSkills(prevSkills => prevSkills.map(skill => skill.id == updatedSkill.id ? updatedSkill : skill));
    };

    //event handler for adding a skill sub-section
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

    //event handler for removing a skill sub-section
    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(s => s.id !== skill.id));
    };

    //event handler for handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');   //gets the JWT token
            const header = {   //sets up te header to contain the JWT
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post('http://localhost:5000/api/v1/user/form-fillup', formData, header);   //makes a post request with the form data and JWT token

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
                <ExperienceForm experiences={experiences} handleExperienceChange={handleExperienceChange} handleAddExperience={handleAddExperience} handleRemoveExperience={handleRemoveExperience}/>
                <EducationForm educations={educations} handleEducationChange={handleEducationChange} handleAddEducation={handleAddEducation} handleRemoveEducation={handleRemoveEducation}/>
                <SkillsForm skills={skills} handleSkillChange={handleSkillChange} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill}/>
                <hr />
                <button type="submit" className="btn btn-primary">Generate Profile</button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Form;