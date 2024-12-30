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
import PublicationsForm from '../PortfolioForm/PublicationsForm.jsx';

function PortfolioPublications({ publications, onSave }) {
    const [localPublications, setLocalPublications] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (publications && publications.length > 0) {
            setLocalPublications(publications);
        }
    }, [publications]);

    const handlePublicationChange = (updatedPublication) => {
        setLocalPublications(prevPublications => prevPublications.map(pub => pub.id === updatedPublication.id ? updatedPublication : pub));
    };

    const handleAddPublication = () => {
        setLocalPublications([
            ...localPublications,
            {
                id: uuidv4(),
                title: '',
                datePublished: '',
                description: '',
                link: ''
            }
        ]);
    };

    const handleRemovePublication = (publication) => {
        setLocalPublications(localPublications.filter(pub => pub.id !== publication.id));
    };

    const handleSave = () => {
        onSave(localPublications);
        persistPublicationsChange(localPublications);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddPublication();
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
        setLocalPublications([...publications]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalPublications([...publications]);
        setShowEdit(false);
    };

    const persistPublicationsChange = async (updatedPublications) => {
        try {
            const payload = {
                section: 'publications',
                data: updatedPublications,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Publications section updated successfully');
            } else {
                console.error('Failed to update publications section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating publications section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="publication">
            <Row>
                <Col>
                    <h2>Publications</h2>
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
                        disabled={localPublications.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {publications.length > 0 ? (
                publications.map((pub) => (
                    <Card key={pub.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{pub.title}</Card.Title>
                            <Card.Subtitle>{pub.datePublished}</Card.Subtitle>
                            <Card.Text>{pub.description}</Card.Text>
                            <Card.Text>{pub.link}</Card.Text>
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
                    Add Publication
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={PublicationsForm}
                title="Edit Publications"
                list={localPublications}
                handleItemChange={handlePublicationChange}
                handleRemoveItem={handleRemovePublication}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={PublicationsForm}
                title="Add Publication"
                item={localPublications[localPublications.length - 1]}
                handleItemChange={handlePublicationChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioPublications;