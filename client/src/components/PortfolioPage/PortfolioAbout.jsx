import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import AddPopUp from './AddPopUp.jsx';
import SummaryForm from '../PortfolioForm/SummaryForm.jsx';

function PortfolioAbout({ img, about, onSave }) {
    const [localAbout, setLocalAbout] = useState('');
    const [show, setShow] = useState(false);  
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (about && about.length > 0) {
            setLocalAbout(about);
        }
    }, [about]);

    const handleAboutChange = (e) => {
        setLocalAbout(e.target.value);
    };

    const handleSave = () => {
        onSave(localAbout);
        persistAboutChange(localAbout);
    };

    const toggle = (str) => {
        setStatus(str);
        setShow(true);
    };

    const save = () => {
        setShow(false);
        handleSave();
    };

    const cancel = () => {
        setLocalAbout(about);
        setShow(false);
    };

    const persistAboutChange = async (updatedAbout) => {
        try {
            const payload = {
                section: 'about',
                data: updatedAbout,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('About section updated successfully');
            } else {
                console.error('Failed to update about section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating about section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Image fluid src={`http://localhost:5000/uploads/${img}`} alt="Profile" />
                </Col>
                <Col>
                    <Row className="mb-2">
                        <Col>
                            <h2>About Me</h2>
                        </Col>
                        <Col className="d-flex flex-row-reverse mb-3">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline-light"
                                className="mx-1"
                                onClick={() => toggle('add')}
                                disabled={about}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline-light"
                                className="mx-1"
                                disabled={!about}
                                onClick={() => toggle('edit')}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-2">
                        {about ? (
                            <p>{about}</p>
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
                                Add About
                            </div>
                        )}
                    </Row>
                </Col>
            </Row>
            <AddPopUp
                ComponentAdd={SummaryForm}
                title={status === 'edit' ? "Edit Professional Summary" : "Add Professional Summary"}
                item={localAbout}
                handleItemChange={handleAboutChange}
                show={show}
                toggle={cancel}
                save={save}
            />
        </Container>
    );
}

export default PortfolioAbout;