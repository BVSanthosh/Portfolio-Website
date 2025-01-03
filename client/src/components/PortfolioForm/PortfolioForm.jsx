/**
 * The Form component
 */

import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import AwardsForm from './AwardsForm.jsx';   //imports the awards section component
import CertificationsForm from './CertificationsForm.jsx';   //imports the certifications section component
import ContactForm from './ContactForm.jsx';   //imports the Contact Information section component  
import EducationForm from './EducationForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import GenerateSections from './GenerateSections.jsx';
import InterestsForm from './InterestsForm.jsx';   //imports the interests section component
import LanguagesForm from './LanguagesForm.jsx';   //imports the languages section component
import ProjectsForm from './ProjectsForm.jsx';   //imports the projects section component
import PublicationsForm from './PublicationsForm.jsx';   //imports the publications section component
import SkillsForm from './SkillsForm.jsx';
import SummaryForm from './SummaryForm.jsx';   //imports the summary section component
import VolunteerForm from './VolunteerForm.jsx';   //imports the volunteer section component

function PortfolioForm() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [contactInfo, setContactInfo] = useState({   //state for managing the contact info section
        firstName: '',  
        lastName: '',
        email: '',
        phoneNumber: '',  
        location: '',
        linkedIn: '',
    });
    const [profileImage, setProfileImage] = useState(null);
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

    //event handler for updating the input fields in the contact info section
    const handleContactChange = (e) => {
        const { name, value } = e.target;

        setContactInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    //event handler for updating the profile image in the contact info section
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
                const maxSize = 5 * 1024 * 1024;

                if (file.size > maxSize) {
                    alert('File size exceeds 5MB. Please upload a smaller file.');
                    return;
                }

                setProfileImage(file);
            } else {
                alert('Please upload a JPEG or PNG image.');
            }
        }
    };

    //event handler for updating textarea for the summary section
    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    };

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
                title: '',
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
            const formData = new FormData();

            // Append the contact info to the formData
            formData.append('contactInfo', JSON.stringify(contactInfo));
            formData.append('summary', summary);
            formData.append('experience', JSON.stringify(experiences));
            formData.append('education', JSON.stringify(educations));
            formData.append('skills', JSON.stringify(skills));
            formData.append('projects', JSON.stringify(projects));
            formData.append('certifications', JSON.stringify(certificates));
            formData.append('publications', JSON.stringify(publications));
            formData.append('awards', JSON.stringify(awards));
            formData.append('languages', JSON.stringify(languages));
            formData.append('volunteerExps', JSON.stringify(volunteerExps));
            formData.append('interests', JSON.stringify(interests));

            // Append the profile image to the formData if available
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            // Make the POST request to the backend
            const response = await axios.post('http://localhost:5000/api/v1/user/form-fillup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                console.log('Form filled up successfully:', response.data);
                navigate('/portfolio');
            } else {
                setErrorMessage('Form fill up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error filling up form:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center">Complete Your Portfolio</h2>
            <Form onSubmit={handleSubmit}>
                <hr />
                <Row className="mb-3">
                    <Col md={12}>
                        <ContactForm item={contactInfo} handleItemChange={handleContactChange} handleFileChange={handleFileChange}/>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={12}>
                        <SummaryForm item={summary} handleItemChange={handleSummaryChange}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <GenerateSections Component={ExperienceForm} title={'Work Experience'} list={experiences} handleItemChange={handleExperienceChange} handleAddItem={handleAddExperience} handleRemoveItem={handleRemoveExperience}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <GenerateSections Component={EducationForm} title={'Education'} list={educations} handleItemChange={handleEducationChange} handleAddItem={handleAddEducation} handleRemoveItem={handleRemoveEducation}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <GenerateSections Component={SkillsForm} title={'Skills'} list={skills} handleItemChange={handleSkillChange} handleAddItem={handleAddSkill} handleRemoveItem={handleRemoveSkill}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleProj && <GenerateSections Component={ProjectsForm} title={'Projects'} list={projects} handleItemChange={handleProjectChange} handleAddItem={handleAddProject} handleRemoveItem={handleRemoveProject}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleCert && <GenerateSections Component={CertificationsForm} title={'Certifications'} list={certificates} handleItemChange={handleCertificateChange} handleAddItem={handleAddCertificate} handleRemoveItem={handleRemoveCertificate}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {togglePub && <GenerateSections Component={PublicationsForm} title={'Publications'} list={publications} handleItemChange={handlePublicationChange} handleAddItem={handleAddPublication} handleRemoveItem={handleRemovePublication}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleAward && <GenerateSections Component={AwardsForm} title={'Awards'} list={awards} handleItemChange={handleAwardChange} handleAddItem={handleAddAward} handleRemoveItem={handleRemoveAward}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleLang && <GenerateSections Component={LanguagesForm} title={'Languages'} list={languages} handleItemChange={handleLanguageChange} handleAddItem={handleAddLanguage} handleRemoveItem={handleRemoveLanguage}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleVol && <GenerateSections Component={VolunteerForm} title={'Volunteer Experience'} list={volunteerExps} handleItemChange={handleVolunteerExpChange} handleAddItem={handleAddVolunteerExp} handleRemoveItem={handleRemoveVolunteerExp}/>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        {toggleInt && <GenerateSections Component={InterestsForm} title={'Hobbies and Interests'} list={interests} handleItemChange={handleInterestChange} handleAddItem={handleAddInterest} handleRemoveItem={handleRemoveInterest}/>}
                    </Col>
                </Row>
                <hr />
                <h3 className="text-center">Optional Sections</h3>
                <Stack gap={3}>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleProj(!toggleProj);
                        if (!toggleProj) {
                            setProjects([]);
                        }
                    }}>
                        {toggleProj ? "Remove Projects" : "Add Projects"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleCert(!toggleCert);
                        if (!toggleCert) {
                            setCertificates([]);
                        }
                    }}>
                        {toggleCert ? "Remove Certification" : "Add Certification"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setTogglePub(!togglePub)
                        if (!togglePub) {
                            setPublications([]);
                        }
                    }}>
                        {togglePub ? "Remove Publication" : "Add Publication"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleAward(!toggleAward);
                        if (!toggleAward) {
                            setAwards([]);
                        }
                    }}>
                        {toggleAward ? "Remove Awards" : "Add Awards"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleLang(!toggleLang);
                        if (!toggleLang) {
                            setLanguages([]);
                        }
                    }}>
                        {toggleLang ? "Remove Languages" : "Add Languages"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleVol(!toggleVol);
                        if (!toggleVol) {
                            setVolunteerExps([]);
                        }
                    }}>
                        {toggleVol ? "Remove Volunteer Experience" : "Add Volunteer Experience"}
                    </Button>
                    <Button variant="outline-light" type="button" onClick={() => {
                        setToggleInt(!toggleInt);
                        if (!toggleInt) {
                            setInterests([]);
                        }
                    }}>
                        {toggleInt ? "Remove Hobbies" : "Add Hobbies"}
                    </Button>
                </Stack>
                <hr />
                <Button variant="outline-light" type="submit">Generate Portfolio</Button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </Form>
        </Container>
    );
}

export default PortfolioForm;