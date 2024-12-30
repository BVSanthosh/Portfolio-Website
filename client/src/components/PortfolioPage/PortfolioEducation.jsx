
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from  'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import EducationForm from '../PortfolioForm/EducationForm.jsx';

function PortfolioEducation({ education, onSave}) {
    const [localEducation, setLocalEducation] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (education && education.length > 0) {
            setLocalEducation(education);
        }
    }, [education]);

    const handleEducationChange = (updatedEducation) => {
        setLocalEducation(prevEducation => prevEducation.map(edu => edu.id == updatedEducation.id ? updatedEducation : edu));
    };

    const handleAddEducation = () => {
        setLocalEducation([
            ...localEducation,
            {
                id: uuidv4(),
                qualification: '',
                institutionName: '',
                location: '',
                startDate: '',
                endDate: '',
                achievements: ''
            }
        ]);
    };

    const handleRemoveEducation = (edu) => {
        setLocalEducation(localEducation.filter(e => e.id !== edu.id));
    };

    const handleSave = () => {
        onSave(localEducation);
        persistEducationChange(localEducation);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddEducation();
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
        setLocalEducation([...education]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalEducation([...education]);
        setShowEdit(false);
    };

    const persistEducationChange = async (updatedEducation) => {
        try {
            const payload = {
                section: 'education',
                data: updatedEducation
            }

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Education section updated successfully');
            } else {
                console.error('Failed to update education section. Please try again.');
            }
        } catch(error) {
            console.error('Error updating about section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="education">
            <Row>
                <Col>
                    <h2>Education</h2>
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
                        disabled={localEducation.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {education && education.length > 0 ? (
                education.map((edu) => (
                    <Card key={edu.id} border="light" bg="dark" text="light" className="my-3">
                        <Card.Body>
                            <Card.Title>{edu.institutionName}</Card.Title>
                            <Card.Subtitle>{edu.qualification}</Card.Subtitle>
                            <Card.Subtitle>
                                {edu.startDate} - {edu.endDate}, {edu.location}
                            </Card.Subtitle>
                            <Card.Text>{edu.achievements}</Card.Text>
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
                    Add Education
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={EducationForm}
                title="Edit Education"
                list={localEducation}
                handleItemChange={handleEducationChange}
                handleRemoveItem={handleRemoveEducation}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={EducationForm}
                title="Add Education"
                item={localEducation[localEducation.length - 1]}
                handleItemChange={handleEducationChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioEducation;