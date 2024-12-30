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
import LanguageForm from '../PortfolioForm/LanguagesForm.jsx';

function PortfolioLanguages({ languages, onSave }) {
    const [localLanguages, setLocalLanguages] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (languages && languages.length > 0) {
            setLocalLanguages(languages);
        }
    }, [languages]);

    const handleLanguageChange = (updatedLanguage) => {
        setLocalLanguages(prevLanguages =>
            prevLanguages.map(lang =>
                lang.id === updatedLanguage.id ? updatedLanguage : lang
            )
        );
    };

    const handleAddLanguage = () => {
        setLocalLanguages([
            ...localLanguages,
            {
                id: uuidv4(),
                language: '',
            },
        ]);
    };

    const handleRemoveLanguage = (language) => {
        setLocalLanguages(localLanguages.filter(lang => lang.id !== language.id));
    };

    const handleSave = () => {
        onSave(localLanguages);
        persistLanguagesChange(localLanguages);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddLanguage();
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
        setLocalLanguages([...languages]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalLanguages([...languages]);
        setShowEdit(false);
    };

    const persistLanguagesChange = async (updatedLanguages) => {
        try {
            const payload = {
                section: 'languages',
                data: updatedLanguages,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Languages section updated successfully');
            } else {
                console.error('Failed to update languages section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating languages section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="language">
            <Row>
                <Col>
                    <h2>Languages</h2>
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
                        disabled={localLanguages.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {languages && languages.length > 0 ? (
                languages.map(lang => (
                    <Card
                        key={lang.id}
                        className="my-3"
                        border="light"
                        bg="dark"
                        text="light"
                    >
                        <Card.Body>
                            <Card.Title>{lang.language}</Card.Title>
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
                    Add Language
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={LanguageForm}
                title="Edit Languages"
                list={localLanguages}
                handleItemChange={handleLanguageChange}
                handleRemoveItem={handleRemoveLanguage}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={LanguageForm}
                title="Add Language"
                item={localLanguages[localLanguages.length - 1]}
                handleItemChange={handleLanguageChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioLanguages;