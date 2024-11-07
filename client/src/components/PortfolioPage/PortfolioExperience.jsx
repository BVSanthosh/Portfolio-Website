
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import ExperienceForm from '../PortfolioForm/ExperienceForm.jsx';

function PortfolioExperience({ experience, handleExperienceChange, handleAddExperience, handleRemoveExperience }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const toggleEdit = () => setShowEdit(!showEdit);
    
    const toggleAdd = () => {
        handleAddExperience();
        setShowAdd(!showAdd);
    };

    const saveEdit = () => {
        setShowEdit(!showEdit);
        persistExperienceChange();
    };

    const saveAdd = () => {
        setShowAdd(!showAdd);
        persistExperienceChange();
    };

    const persistExperienceChange = async () => {
        try {
            const updatedExperience = {
                section: 'experience',
                data: experience
            }

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', updatedExperience);

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
        <Container>
            <Row>
                <Col>
                    <h2>Experience</h2>
                </Col>
                <Col className="d-flex flex-row-reverse my-2">
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleAdd}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleEdit} disabled={!(experience && experience.length > 0)}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </Col>
            </Row>
            {experience && experience.length > 0 ?
                experience.map(exp => (
                    <Card key={exp.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{exp.companyName}</Card.Title>
                            <Card.Subtitle>{exp.jobTitle}</Card.Subtitle>
                            <Card.Subtitle>{exp.startDate + " - " + exp.endDate + ", " + exp.location}</Card.Subtitle>
                            <Card.Text>{exp.achievements}</Card.Text>
                        </Card.Body>
                    </Card>
                )) : (
                    <div style={{border: "1px solid #fff", padding: "10px", display: "flex", justifyContent: "center", borderRadius: "6px" }}>
                        Add Experience
                    </div>
            )}
            {showEdit && <EditPopUp ComponentList={EditList} ComponentEdit={ExperienceForm} title={'Edit Experience'} list={experience} handleItemChange={handleExperienceChange} handleRemoveItem={handleRemoveExperience} show={showEdit} toggle={toggleEdit} save={saveEdit}/>}
            {showAdd && <AddPopUp ComponentAdd={ExperienceForm} title={'Add Experience'} item={experience[experience.length - 1]} handleItemChange={handleExperienceChange} show={showAdd} toggle={toggleAdd} save={saveAdd}/>}
        </Container>
    );
}

export default PortfolioExperience;