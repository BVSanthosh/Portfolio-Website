/**
 * Portfolio Component
 */
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import PortfolioAbout from './PortfolioAbout.jsx';
import PortfolioAwards from './PortfolioAwards.jsx';
import PortfolioCertifications from './PortfolioCertifications.jsx';
import PortfolioEducation from './PortfolioEducation.jsx';
import PortfolioExperience from './PortfolioExperience.jsx';
import PortfolioInterests from './PortfolioInterests.jsx';
import PortfolioLanguages from './PortfolioLanguages.jsx';
import PortfolioProjects from './PortfolioProjects.jsx';
import PortfolioPublications from './PortfolioPublications.jsx';
import PortfolioSkills from './PortfolioSkills.jsx';
import PortfolioVolunteer from './PortfolioVolunteer.jsx';

function PortfolioPage() {
    const [contactInfo, setContactInfo] = useState({});
    const [profileImage, setProfileImage] = useState('');
    const [about, setAbout] = useState('');
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [publications, setPublications] = useState([]);
    const [awards, setAwards] = useState([]);
    const [languages, setLanguages] = useState([]);   
    const [volunteerExps, setVolunteerExps] = useState([]);  
    const [interests, setInterests] = useState([]);   

    const [sectionVisibility, setSectionVisibility] = useState({});

    const sections = [
        "Experience",
        "Education",
        "Skill",
        "Project",
        "Certification",
        "Publication",
        "Award",
        "Language",
        "Volunteer Experience",
        "Hobby"
    ];

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/portfolio');

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
                    setProfileImage(response.data.data.profileImage);
                    setAbout(response.data.data.summary);
                    setExperience(response.data.data.experience);
                    setEducation(response.data.data.education);
                    setSkills(response.data.data.skills);
                    setProjects(response.data.data.projects);
                    setCertificates(response.data.data.certifications);
                    setPublications(response.data.data.publications);
                    setAwards(response.data.data.awards);
                    setLanguages(response.data.data.languages);
                    setVolunteerExps(response.data.data.volunteer);
                    setInterests(response.data.data.interests);

                    const visibility = {
                        "Experience": response.data.data.experience.length > 0,
                        "Education": response.data.data.education.length > 0,
                        "Skill": response.data.data.skills.length > 0,
                        "Project": response.data.data.projects.length > 0,
                        "Certification": response.data.data.certifications.length > 0,
                        "Publication": response.data.data.publications.length > 0,
                        "Award": response.data.data.awards.length > 0,
                        "Language": response.data.data.languages.length > 0,
                        "Volunteer Experience": response.data.data.volunteer.length > 0,
                        "Hobby": response.data.data.interests.length > 0
                    };
    
                    setSectionVisibility(visibility);
                } else {
                    console.error('Failed to fetch user data. Please try again.');
                }
            } catch(error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            }
        }

        fetchPortfolioData();
    }, []);

    const handleSaveAbout = (updatedAbout) => {
        setAbout(updatedAbout);
    };

    const handleSaveExperience = (updatedExperience) => {
        setExperience(updatedExperience);
    };

    const handleSaveEducation = (updatedEducation) => {
        setEducation(updatedEducation);
    };

    const handleSaveSkills = (updatedSkills) => {
        setSkills(updatedSkills);
    };

    const handleSaveProjects = (updatedProjects) => {
        setProjects(updatedProjects);
    };

    const handleSaveCertificates = (updatedCertificates) => {
        setCertificates(updatedCertificates);
    };

    const handleSavePublications = (updatedPublications) => {
        setPublications(updatedPublications);
    };

    const handleSaveAwards = (updatedAwards) => {
        setAwards(updatedAwards);
    };

    const handleSaveLanguages = (updatedLanguages) => {
        setLanguages(updatedLanguages);
    };

    const handleSaveVolunteerExps = (updatedVolunteerExps) => {
        setVolunteerExps(updatedVolunteerExps);
    };

    const handleSaveInterests = (updatedInterests) => {
        setInterests(updatedInterests);
    };

    const toggleSectionVisibility = (title) => {
        setSectionVisibility((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    return (
        <>
            <Navbar expand="lg" sticky="top" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#about">
                        <h4>{`${contactInfo.firstName} ${contactInfo.lastName}`}</h4>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav navbarScroll>
                            {sections.map(
                                (section) =>
                                    sectionVisibility[section] && (
                                        <Nav.Link key={section} href={`#${section.toLowerCase().replace(/\s+/g, '')}`}>
                                            {section}
                                        </Nav.Link>
                                    )
                            )}
                            <NavDropdown title={<FontAwesomeIcon icon={faCog} />} id="settings-nav-dropdown" align="end">
                                {sections.map((section) => (
                                    <NavDropdown.Item key={section} onClick={() => toggleSectionVisibility(section)}>
                                        {sectionVisibility[section] ? `Remove ${section}` : `Add ${section}`}
                                    </NavDropdown.Item>
                                ))}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <div className="portfolio-sections">
                    <br />
                    <PortfolioAbout img={profileImage} about={about} onSave={handleSaveAbout} />
                    <br />
                    {sectionVisibility['Experience'] && (
                        <PortfolioExperience experience={experience} onSave={handleSaveExperience} />
                    )}

                    {sectionVisibility['Education'] && (
                        <PortfolioEducation education={education} onSave={handleSaveEducation} />
                    )}

                    {sectionVisibility['Skill'] && (
                        <PortfolioSkills skills={skills} onSave={handleSaveSkills} />
                    )}

                    {sectionVisibility['Project'] && (
                        <PortfolioProjects projects={projects} onSave={handleSaveProjects} />
                    )}

                    {sectionVisibility['Certification'] && (
                        <PortfolioCertifications certificates={certificates} onSave={handleSaveCertificates} />
                    )}

                    {sectionVisibility['Publication'] && (
                        <PortfolioPublications publications={publications} onSave={handleSavePublications} />
                    )}

                    {sectionVisibility['Award'] && (
                        <PortfolioAwards awards={awards} onSave={handleSaveAwards} />
                    )}

                    {sectionVisibility['Language'] && (
                        <PortfolioLanguages languages={languages} onSave={handleSaveLanguages} />
                    )}

                    {sectionVisibility['Volunteer Experience'] && (
                        <PortfolioVolunteer volunteerExps={volunteerExps} onSave={handleSaveVolunteerExps} />
                    )}

                    {sectionVisibility['Hobby'] && (
                        <PortfolioInterests interests={interests} onSave={handleSaveInterests} />
                    )}
                </div>
            </main>
        </>
    );
}

export default PortfolioPage;