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
import AwardsForm from '../PortfolioForm/AwardsForm.jsx';

function PortfolioAward({ awards, onSave }) {
    const [localAwards, setLocalAwards] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (awards && awards.length > 0) {
            setLocalAwards(awards);
        }
    }, [awards]);

    const handleAwardChange = (updatedAward) => {
        setLocalAwards(prevAwards => prevAwards.map(award => award.id === updatedAward.id ? updatedAward : award));
    };

    const handleAddAward = () => {
        setLocalAwards([
            ...localAwards,
            {
                id: uuidv4(),
                title: '',
                organisation: '',
                dateAwarded: '',
                description: ''
            }
        ]);
    };

    const handleRemoveAward = (award) => {
        setLocalAwards(localAwards.filter(a => a.id !== award.id));
    };

    const handleSave = () => {
        onSave(localAwards);
        persistAwardsChange(localAwards);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddAward();
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
        setLocalAwards([...awards]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalAwards([...awards]);
        setShowEdit(false);
    };

    const persistAwardsChange = async (updatedAwards) => {
        try {
            const payload = {
                section: 'awards',
                data: updatedAwards,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Awards section updated successfully');
            } else {
                console.error('Failed to update awards section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating awards section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="award">
            <Row>
                <Col>
                    <h2>Awards</h2>
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
                        disabled={localAwards.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {awards.length > 0 ? (
                awards.map((award) => (
                    <Card key={award.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{award.title}</Card.Title>
                            <Card.Subtitle>{award.organisation}</Card.Subtitle>
                            <Card.Subtitle>{award.dateAwarded}</Card.Subtitle>
                            <Card.Text>{award.description}</Card.Text>
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
                    Add Award
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={AwardsForm}
                title="Edit Awards"
                list={localAwards}
                handleItemChange={handleAwardChange}
                handleRemoveItem={handleRemoveAward}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={AwardsForm}
                title="Add Award"
                item={localAwards[localAwards.length - 1]}
                handleItemChange={handleAwardChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioAward;