/**
 * The Form component
 */

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AwardsForm from './AwardsForm.jsx';   //imports the awards section component
import CertificationsForm from './CertificationsForm.jsx';   //imports the certifications section component
import ConatctForm from './ContactForm.jsx';   //imports the Contact Information section component  
import EducationForm from './EducationForm.jsx';   //imports the Education section component
import ExperienceForm from './ExperienceForm.jsx';   //imports the Experience section component
import InterestsForm from './InterestsForm.jsx';   //imports the interests section component
import LanguagesForm from './LanguagesForm.jsx';   //imports the languages section component
import ProjectsForm from './ProjectsForm.jsx';   //imports the projects section component
import PublicationsForm from './PublicationsForm.jsx';   //imports the publications section component
import SkillsForm from './SkillsForm.jsx';   //imports the skills section component
import SumaryForm from './SummaryForm.jsx';   //imports the summary section component
import VolunteerForm from './VolunteerForm.jsx';   //imports the volunteer section component

function Form() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [contactInfo, setContactInfo] = useState({   //state for managing the contact info section
        firstName: '',  
        lastName: '',
        email: '',
        phoneNumber: '',  
        location: '',
        linkedin: '',
    });
    const [summary, setSummary] = useState('');   //state for manging the summary section
    const [experiences, setExperiences] = useState([]);   //state for managing the experience section
    const [educations, setEducations] = useState([]);   //state for managing the education section
    const [skills, setSkills] = useState([]);   //state for managing the skills section
    const [projects, setProjects] = useState([]);   //state for manging the projects section
    const [certificates, setCertificates] = useState([]);   //state for managing the certifications section
    const [publications, setPublications] = useState([]);   //state for managing the publications section
    const [awards, setAwards] = useState([]);   //state for managing the awards section
    const [languages, setLanguages] = useState([]);   //state for managing the languages section
    const [volunteerExps, setVolunteerExps] = useState([]);   //state for managing the volunteer section
    const [interests, setInterests] = useState([]);   //state for managing the interests section

    const [nextExpId, setNextExpId] = useState(0);   //state for manging the id of each experience entry
    const [nextEduId, setNextEduId] = useState(0);   //state for manging the id of each education entry
    const [nextSkillId, setNextSkillId] = useState(0);   //state for manging the id of each skill entry
    const [nextProjId, setNextProjId] = useState(0);   //state for manging the id of each project entry
    const [nextCertId, setNextCertId] = useState(0);   //state for manging the id of each certification entry
    const [nextPubId, setNextPubId] = useState(0);   //state for manging the id of each publication entry
    const [nextAwardId, setNextAwardId] = useState(0);   //state for manging the id of each award entry
    const [nextLangId, setNextLangId] = useState(0);   //state for manging the id of each language entry
    const [nextVolId, setNextVolId] = useState(0);   //state for manging the id of each volunteer entry
    const [nextIntId, setNextIntId] = useState(0);   //state for manging the id of each interest entry

    const [toggleProj, setToggleProj] = useState(false);
    const [toggleCert, setToggleCert] = useState(false);
    const [togglePub, setTogglePub] = useState(false);
    const [toggleAward, setToggleAward] = useState(false);
    const [toggleLang, setToggleLang] = useState(false);
    const [toggleVol, setToggleVol] = useState(false);
    const [toggleInt, setToggleInt] = useState(false);

    const formData = {   //the entire form data passed as the body in a post request
        contactInfo: contactInfo,
        summary: summary,
        experience: experiences,
        education: educations,
        skills: skills,
        projects: projects,
        certifications: certificates
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

    //event handler for updating the input fields of an experience sub-section
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
                description: ''
            }
        ]);

        setNextExpId(nextExpId => nextExpId + 1);
    };

    //event handler for removing an experience sub-section
    const handleRemoveExperience = (experience) => {
        setExperiences(experiences.filter(exp => exp.id !== experience.id));
    };

    //event handler for updating the input fields of an education sub-section
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

    //event handler for updating the input field of a skill sub-section
    const handleSkillChange = (updatedSkill) => {
        setSkills(prevSkills => prevSkills.map(skill => skill.id == updatedSkill.id ? updatedSkill : skill));
    };

    //event handler for adding a skill sub-section
    const handleAddSkill = () => {
        setSkills([
            ...skills,
            {
                id: nextSkillId,
                title: '',
                name: ''
            }
        ]);

        setNextSkillId(nextSkillId => nextSkillId + 1);
    }

    //event handler for removing a skill sub-section
    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(s => s.id !== skill.id));
    };

    //event handler for updating the input fields of a project sub-section
    const handleProjectChange = (updatedProject) => {
        setProjects(prevProjects => prevProjects.map(proj => proj.id == updatedProject.id ? updatedProject : proj));
    };

    //event handler for adding a project sub-section
    const handleAddProject = () => {
        setProjects([
            ...projects,
            {
                id: nextProjId,
                achievements: ''
            }
        ]);

        setNextProjId(nextProjId => nextProjId + 1);
    };

    //event handler for removing a certificate sub-section
    const handleRemoveProject = (project) => {
        setProjects(projects.filter(proj => proj.id !== project.id));
    };

    //event handler for updating the input fields of a certificate sub-section
    const handleCertificateChange = (updatedCertificate) => {
        setCertificates(prevCertificates => prevCertificates.map(cert => cert.id == updatedCertificate.id ? updatedCertificate : cert));
    };

    //event handler for adding a certificate sub-section
    const handleAddCertificate = () => {
        setCertificates([
            ...certificates,
            {
                id: nextCertId,
                title: '',
                organisation: '',
                dateEarned: '',
                description: ''
            }
        ]);

        setNextCertId(nextCertId => nextCertId + 1);
    };

    //event handler for removing a certificate sub-section
    const handleRemoveCertificate = (certificate) => {
        setCertificates(certificates.filter(cert => cert.id !== certificate.id));
    };

    //event handler for updating the input fields of a publication sub-section
    const handlePublicationChange = (updatedPublication) => {
        setPublications(prevPublications => prevPublications.map(pub => pub.id == updatedPublication.id ? updatedPublication : pub));
    };

    //event handler for adding a publication sub-section
    const handleAddPublication = () => {
        setPublications([
            ...publications,
            {
                id: nextPubId,
                title: '',
                datePublised: '',
                link: '',
                description: ''
            }
        ]);

        setNextPubId(nextPubId => nextPubId + 1);
    };

    //event handler for removing a publication sub-section
    const handleRemovePublication = (publication) => {
        setPublications(publications.filter(pub => pub.id !== publication.id));
    };

    //event handler for updating the input fields of an award sub-section
    const handleAwardChange = (updatedAward) => {
        setAwards(prevAward => prevAward.map(award => award.id == updatedAward.id ? updatedAward : award));
    };

    //event handler for adding an award sub-section
    const handleAddAward = () => {
        setAwards([
            ...awards,
            {
                id: nextAwardId,
                title: '',
                organisation: '',
                dateAwarded: '',
                description: ''
            }
        ]);

        setNextAwardId(nextAwardId => nextAwardId + 1);
    };

    //event handler for removing a language sub-section
    const handleRemoveAward = (award) => {
        setAwards(awards.filter(a => a.id !== award.id));
    };

    //event handler for updating the input fields of a language sub-section
    const handleLanguageChange = (updatedLanguage) => {
        setLanguages(prevLang => prevLang.map(lang => lang.id == updatedLanguage.id ? updatedLanguage : lang));
    };

    //event handler for adding a language sub-section
    const handleAddLanguage = () => {
        setLanguages([
            ...languages,
            {
                id: nextLangId,
                language: ''
            }
        ]);

        setNextLangId(nextLangId => nextLangId + 1);
    };

    //event handler for removing a language sub-section
    const handleRemoveLanguage = (language) => {
        setLanguages(languages.filter(lang => lang.id !== language.id));
    };

    //event handler for updating the input fields of a volunteer experience sub-section
    const handleVolunteerExpChange = (updatedVolunteerExp) => {
        setVolunteerExps(prevVol => prevVol.map(vol => vol.id == updatedVolunteerExp.id ? updatedVolunteerExp : vol));
    };

    //event handler for adding a volunteer experience sub-section
    const handleAddVolunteerExp = () => {
        setVolunteerExps([
            ...volunteerExps,
            {
                id: nextVolId,
                position: '',
                organisation: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        ]);

        setNextVolId(nextVolId => nextVolId + 1);
    };

    //event handler for removing a volunteer experience sub-section
    const handleRemoveVolunteerExp = (volunteerExp) => {
        setVolunteerExps(volunteerExps.filter(vol => vol.id !== volunteerExp.id));
    };

    //event handler for updating the input fields of a language sub-section
    const handleInterestChange = (updatedInterest) => {
        setInterests(prevInt => prevInt.map(int => int.id == updatedInterest.id ? updatedInterest : int));
    };

    //event handler for adding an interest sub-section
    const handleAddInterest = () => {
        setInterests([
            ...interests,
            {
                id: nextIntId,
                interest: ''
            }
        ]);

        setNextIntId(nextIntId => nextIntId + 1);
    };

    //event handler for removing an interest sub-section
    const handleRemoveInterest = (interest) => {
        setInterests(interests.filter(int => int.id !== interest.id));
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
            <h2>Complete Your Portfolio</h2>
            <form onSubmit={handleSubmit}>
                <hr />
                <ConatctForm handleContactChange={handleContactChange}/>
                <SumaryForm handleSummaryChange={handleSummaryChange}/>
                <ExperienceForm experiences={experiences} handleExperienceChange={handleExperienceChange} handleAddExperience={handleAddExperience} handleRemoveExperience={handleRemoveExperience}/>
                <EducationForm educations={educations} handleEducationChange={handleEducationChange} handleAddEducation={handleAddEducation} handleRemoveEducation={handleRemoveEducation}/>
                <SkillsForm skills={skills} handleSkillChange={handleSkillChange} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill}/>
                {toggleProj && <ProjectsForm projects={projects} handleProjectChange={handleProjectChange} handleAddProject={handleAddProject} handleRemoveProject={handleRemoveProject}/>}
                {toggleCert && <CertificationsForm certificates={certificates} handleCertificateChange={handleCertificateChange} handleAddCertificate={handleAddCertificate} handleRemoveCertificate={handleRemoveCertificate}/>}
                {togglePub && <PublicationsForm publications={publications} handlePublicationChange={handlePublicationChange} handleAddPublication={handleAddPublication} handleRemovePublication={handleRemovePublication}/>}
                {toggleAward && <AwardsForm awards={awards} handleAwardChange={handleAwardChange} handleAddAward={handleAddAward} handleRemoveAward={handleRemoveAward}/>}
                {toggleLang && <LanguagesForm languages={languages} handleLanguageChange={handleLanguageChange} handleAddLanguage={handleAddLanguage} handleRemoveLanguage={handleRemoveLanguage}/>}
                {toggleVol && <VolunteerForm volunteerExps={volunteerExps} handleVolunteerExpChange={handleVolunteerExpChange} handleAddVolunteerExp={handleAddVolunteerExp} handleRemoveVolunteerExp={handleRemoveVolunteerExp}/>}
                {toggleInt && <InterestsForm interests={interests} handleInterestChange={handleInterestChange} handleAddInterest={handleAddInterest} handleRemoveInterest={handleRemoveInterest}/>}
                <br />
                <h3>Optional Sections</h3>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleProj(!toggleProj);
                    if (!toggleProj) {
                        setProjects([]);
                    }
                }}>
                    {toggleProj ? "Remove Projects" : "Add Projects"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleCert(!toggleCert);
                    if (!toggleCert) {
                        setCertificates([]);
                    }
                }}>
                    {toggleCert ? "Remove Certification" : "Add Certification"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setTogglePub(!togglePub)
                    if (!togglePub) {
                        setPublications([]);
                    }
                }}>
                    {togglePub ? "Remove Publication" : "Add Publication"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleAward(!toggleAward);
                    if (!toggleAward) {
                        setAwards([]);
                    }
                }}>
                    {toggleAward ? "Remove Awards" : "Add Awards"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleLang(!toggleLang);
                    if (!toggleLang) {
                        setLanguages([]);
                    }
                }}>
                    {toggleLang ? "Remove Languages" : "Add Languages"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleVol(!toggleVol);
                    if (!toggleVol) {
                        setVolunteerExps([]);
                    }
                }}>
                    {toggleVol ? "Remove Volunteer Experience" : "Add Volunteer Experience"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    setToggleInt(!toggleInt);
                    if (!toggleInt) {
                        setInterests([]);
                    }
                }}>
                    {toggleInt ? "Remove Hobbies" : "Add Hobbies"}
                </button>
                <hr />
                <button type="submit" className="btn btn-primary">Generate Portfolio</button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Form;