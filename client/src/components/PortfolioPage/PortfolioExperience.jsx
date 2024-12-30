import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import ExperienceForm from '../PortfolioForm/ExperienceForm.jsx';

function PortfolioExperience({ experience, onSave }) {
    const [localExperience, setLocalExperience] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (experience && experience.length > 0) {
            setLocalExperience(experience);
        }
    }, [experience]);

    const handleExperienceChange = (updatedExperience) => {
        setLocalExperience(prevExperience => prevExperience.map(exp => exp.id === updatedExperience.id ? updatedExperience : exp));
    };

    const handleAddExperience = () => {
        setLocalExperience([
            ...localExperience,
            {
                id: uuidv4(),
                jobTitle: '',
                companyName: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]);
    };

    const handleRemoveExperience = (exp) => {
        setLocalExperience(localExperience.filter(item => item.id !== exp.id));
    };

    const handleSave = () => {
        onSave(localExperience);
        persistExperienceChange(localExperience);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddExperience();
        setShowAdd(true);
    };

    const saveEdit = () => {
        setShowEdit(false);
        handleSave();
    };

    const saveAdd = () => {
        setShowAdd(false);
        handleSave();
    };

    const cancelAdd = () => {
        setLocalExperience([...experience]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalExperience([...experience]);
        setShowEdit(false);
    };

    const persistExperienceChange = async (updatedExperience) => {
        try {
            const payload = {
                section: 'experience',
                data: updatedExperience,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Experience section updated successfully');
            } else {
                console.error('Failed to update experience section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating experience section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="experience">
            <Row>
                <Col>
                    <h2>Experience</h2>
                </Col>
                <Col className="d-flex flex-row-reverse my-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline-light"
                        className="mx-1"
                        onClick={toggleAdd}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline-light"
                        className="mx-1"
                        onClick={toggleEdit}
                        disabled={localExperience.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {experience.length > 0 ? (
                experience.map((exp) => (
                    <Card key={exp.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{exp.companyName}</Card.Title>
                            <Card.Subtitle>{exp.jobTitle}</Card.Subtitle>
                            <Card.Subtitle>{exp.startDate} - {exp.endDate}, {exp.location}</Card.Subtitle>
                            <Card.Text>{exp.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <div
                    style={{
                        border: '1px solid #fff',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '6px',
                    }}
                >
                    Add Experience
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={ExperienceForm}
                title="Edit Experience"
                list={localExperience}
                handleItemChange={handleExperienceChange}
                handleRemoveItem={handleRemoveExperience}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={ExperienceForm}
                title="Add Experience"
                item={localExperience[localExperience.length - 1]}
                handleItemChange={handleExperienceChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioExperience;
