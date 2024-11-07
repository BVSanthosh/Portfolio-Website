
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import Button from  'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import EducationForm from '../PortfolioForm/EducationForm.jsx';

function PortfolioEducation({ education, handleEducationChange, handleAddEducation, handleRemoveEducation}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const toggleEdit = () => setShowEdit(!showEdit);

    const toggleAdd = () => {
        handleAddEducation();
        setShowAdd(!showAdd);
    };

    const saveEdit = () => {
        setShowEdit(!true);
        persistEducationChange();
    };

    const saveAdd = () => {
        setShowAdd(!showAdd);
        persistEducationChange();
    }

    const persistEducationChange = async () => {
        try {
            const updatedEducation = {
                section: 'education',
                data: education
            }

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', updatedEducation);

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
            <Row >
                <Col>
                    <h2>Education</h2>
                </Col>
                <Col className="d-flex flex-row-reverse my-2">
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleAdd}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleEdit} disabled={!(education && education.length > 0)}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </Col>
            </Row>
            
            {education && education.length > 0  ? 
                education.map(edu => (
                    <Card key={edu.id} border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{edu.institutionName}</Card.Title>
                            <Card.Subtitle>{edu.qualification}</Card.Subtitle>
                            <Card.Subtitle>{edu.startDate + " - " + edu.endDate + ", " + edu.location}</Card.Subtitle>
                            <Card.Text>{edu.achievements}</Card.Text>
                        </Card.Body>
                    </Card>
                )): (
                    <div style={{border: "1px solid #fff", padding: "10px", display: "flex", justifyContent: "center", borderRadius: "6px" }}>
                        Add Education
                    </div>
            )}      
            {showEdit && <EditPopUp ComponentList={EditList} ComponentEdit={EducationForm} title={'Edit Education'} list={education} handleItemChange={handleEducationChange} handleRemoveItem={handleRemoveEducation} show={showEdit} toggle={toggleEdit} save={saveEdit}/>}
            {showAdd && <AddPopUp ComponentAdd={EducationForm} title={'Add Education'} item={education[education.length - 1]} handleItemChange={handleEducationChange} show={showAdd} toggle={toggleAdd} save={saveAdd}/>}
        </Container>
    );
}

export default PortfolioEducation;