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
import CertificationsForm from '../PortfolioForm/CertificationsForm.jsx';

function PortfolioCertification({ certificates, onSave }) {
    const [localCertificates, setLocalCertificates] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (certificates && certificates.length > 0) {
            setLocalCertificates(certificates);
        }
    }, [certificates]);

    const handleCertificateChange = (updatedCertificate) => {
        setLocalCertificates(prevCertificates =>
            prevCertificates.map(cert => cert.id === updatedCertificate.id ? updatedCertificate : cert)
        );
    };

    const handleAddCertificate = () => {
        setLocalCertificates([
            ...localCertificates,
            {
                id: uuidv4(),
                title: '',
                organisation: '',
                dateEarned: '',
                description: ''
            }
        ]);
    };

    const handleRemoveCertificate = (certificate) => {
        setLocalCertificates(localCertificates.filter(cert => cert.id !== certificate.id));
    };

    const handleSave = () => {
        onSave(localCertificates);
        persistCertificatesChange(localCertificates);
    };

    const toggleEdit = () => setShowEdit(true);

    const toggleAdd = () => {
        handleAddCertificate();
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
        setLocalCertificates([...certificates]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalCertificates([...certificates]);
        setShowEdit(false);
    };

    const persistCertificatesChange = async (updatedCertificates) => {
        try {
            const payload = {
                section: 'certifications',
                data: updatedCertificates,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Certification section updated successfully');
            } else {
                console.error('Failed to update certification section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating certification section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="certification">
            <Row>
                <Col>
                    <h2>Certification</h2>
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
                        disabled={localCertificates.length === 0}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {certificates.length > 0 ? (
                certificates.map(cert => (
                    <Card key={cert.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{cert.title}</Card.Title>
                            <Card.Subtitle>{cert.organisation}</Card.Subtitle>
                            <Card.Subtitle>{cert.dateEarned}</Card.Subtitle>
                            <Card.Text>{cert.description}</Card.Text>
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
                    Add Certification
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={CertificationsForm}
                title="Edit Certification"
                list={localCertificates}
                handleItemChange={handleCertificateChange}
                handleRemoveItem={handleRemoveCertificate}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={CertificationsForm}
                title="Add Certification"
                item={localCertificates[localCertificates.length - 1]}
                handleItemChange={handleCertificateChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioCertification;