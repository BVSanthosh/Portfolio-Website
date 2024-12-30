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
import InterestsForm from '../PortfolioForm/InterestsForm.jsx';

function PortfolioInterests({ interests, onSave }) {
    const [localInterests, setLocalInterests] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (interests && interests.length > 0) {
            setLocalInterests(interests);
        }
    }, [interests]);

    const handleInterestChange = (updatedInterest) => {
        setLocalInterests(prevInterests => prevInterests.map(int => int.id === updatedInterest.id ? updatedInterest : int));
    };

    const handleAddInterest = () => {
        setLocalInterests([
            ...localInterests,
            {
                id: uuidv4(),
                interest: '',
            },
        ]);
    };

    const handleRemoveInterest = (interest) => {
        setLocalInterests(localInterests.filter(int => int.id !== interest.id));
    };

    const handleSave = () => {
        onSave(localInterests);
        persistInterestsChange(localInterests);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddInterest();
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
        setLocalInterests([...interests]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalInterests([...interests]);
        setShowEdit(false);
    };

    const persistInterestsChange = async (updatedInterests) => {
        try {
            const payload = {
                section: 'interests',
                data: updatedInterests,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Interests section updated successfully');
            } else {
                console.error('Failed to update interests section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating interests section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="hobby">
            <Row>
                <Col>
                    <h2 id="interests">Hobbies</h2>
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
                        disabled={localInterests.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {interests.length > 0 ? (
                interests.map((interest) => (
                    <Card key={interest.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{interest.interest}</Card.Title>
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
                    Add Hobby
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={InterestsForm}
                title="Edit Hobbies"
                list={localInterests}
                handleItemChange={handleInterestChange}
                handleRemoveItem={handleRemoveInterest}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={InterestsForm}
                title="Add Hobby"
                item={localInterests[localInterests.length - 1]}
                handleItemChange={handleInterestChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioInterests;