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
import VolunteerForm from '../PortfolioForm/VolunteerForm.jsx';

function PortfolioVolunteer({ volunteerExps, onSave }) {
    const [localVolunteerExps, setLocalVolunteerExps] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (volunteerExps && volunteerExps.length > 0) {
            setLocalVolunteerExps(volunteerExps);
        }
    }, [volunteerExps]);

    const handleVolunteerExpChange = (updatedExp) => {
        setLocalVolunteerExps(prevExps => prevExps.map(exp => exp.id === updatedExp.id ? updatedExp : exp));
    };

    const handleAddVolunteerExp = () => {
        setLocalVolunteerExps([
            ...localVolunteerExps,
            {
                id: uuidv4(),
                position: '',
                organisation: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        ]);
    };

    const handleRemoveVolunteerExp = (exp) => {
        setLocalVolunteerExps(localVolunteerExps.filter(e => e.id !== exp.id));
    };

    const handleSave = () => {
        onSave(localVolunteerExps);
        persistExperienceChange(localVolunteerExps);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddVolunteerExp();
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
        setLocalVolunteerExps([...volunteerExps]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalVolunteerExps([...volunteerExps]);
        setShowEdit(false);
    };

    const persistExperienceChange = async (updatedExperiences) => {
        try {
            const payload = {
                section: 'volunteer',
                data: updatedExperiences,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Volunteer experience updated successfully');
            } else {
                console.error('Failed to update volunteer experience section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating volunteer experience section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="volunteerexperience">
            <Row>
                <Col>
                    <h2>Volunteer Experience</h2>
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
                        disabled={localVolunteerExps.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {localVolunteerExps.length > 0 ? (
                localVolunteerExps.map((volunteerExp) => (
                    <Card key={volunteerExp.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{volunteerExp.position}</Card.Title>
                            <Card.Subtitle>{volunteerExp.organisation}</Card.Subtitle>
                            <Card.Subtitle>{volunteerExp.startDate + " - " + volunteerExp.endDate}</Card.Subtitle>
                            <Card.Text>{volunteerExp.responsibilities}</Card.Text>
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
                    Add Volunteer Experience
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={VolunteerForm}
                title="Edit Volunteer Experience"
                list={localVolunteerExps}
                handleItemChange={handleVolunteerExpChange}
                handleRemoveItem={handleRemoveVolunteerExp}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={VolunteerForm}
                title="Add Volunteer Experience"
                item={localVolunteerExps[localVolunteerExps.length - 1]}
                handleItemChange={handleVolunteerExpChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioVolunteer;