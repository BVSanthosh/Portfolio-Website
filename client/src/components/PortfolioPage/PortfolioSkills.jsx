import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import SkillsForm from '../PortfolioForm/SkillsForm.jsx';

function PortfolioSkills({ skills, onSave}) {
    const [localSkills, setLocalSkills] = useState([...skills]);
    const [page, setPage] = useState(1);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    
    const rowsPerPage = 2;
    const colsPerPage = 6;
    const skillsPerPage = rowsPerPage * colsPerPage;

    const startIndex = (page - 1) * skillsPerPage;
    const currentSkills = skills.slice(startIndex, startIndex + skillsPerPage);

    const totalPages = Math.ceil(skills.length / skillsPerPage);

    const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

    const handleSkillChange = (updatedSkill) => {
        setLocalSkills(prevSkills => prevSkills.map(skill => skill.id == updatedSkill.id ? updatedSkill : skill));
    };

    const handleAddSkill = () => {
        setLocalSkills([
            ...localSkills,
            {
                id: uuidv4(),
                name: ''
            }
        ]);
    }

    const handleRemoveSkill = (skill) => {
        setLocalSkills(localSkills.filter(s => s.id !== skill.id));
    };

    const handleSave = () => {
        onSave(localSkills);
        persistSkillsChange(localSkills);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddSkill();
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
        setLocalSkills([...localSkills]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalSkills([...localSkills]);
        setShowEdit(false);
    };

    const persistSkillsChange = async (updatedSkills) => {
        try {
            const payload = {
                section: 'skills',
                data: updatedSkills
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Skills section updated successfully');
            } else {
                console.error('Failed to update skills section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating skills section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="skill">
            <Row>
                <Col>
                    <h2 style={{ paddingTop: '18px', marginBottom: '10px' }}>Skills</h2> 
                </Col>
                <Col className="d-flex flex-row-reverse my-2" style={{ paddingTop: '16px'}}> 
                    <Button 
                        type="button" 
                        size="sm" 
                        variant="outline-light" 
                        className="mx-1" 
                        onClick={toggleAdd}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button 
                        type="button"
                        size="sm"
                        variant="outline-light"
                        className="mx-1"
                        onClick={toggleEdit}
                        disabled={!(skills && skills.length > 0)}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </Col>
            </Row>
            {skills && skills.length > 0 ? 
                Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                    <Row key={rowIndex} className="mb-3">
                        {currentSkills.slice(rowIndex * colsPerPage, (rowIndex + 1) * colsPerPage).map((skill, colIndex) => (
                            <Col key={colIndex}>
                                <Card border="light" bg="dark" text="light">
                                    <Card.Body>
                                        <Card.Title>{skill.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )) : (
                    <div style={{
                            border: "1px solid #fff", 
                            padding: "10px", 
                            display: "flex", 
                            justifyContent: "center", 
                            borderRadius: "6px" 
                        }}>
                        Add Skill
                    </div>
            )}
            {skills && skills.length > 0 ? (
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => setPage(1)} disabled={page == 1}/>
                    <Pagination.Prev onClick={handlePrevPage} disabled={page == 1}/>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Next onClick={handleNextPage} disabled={page == totalPages}/>
                    <Pagination.Last onClick={() => setPage(totalPages)} disabled={page == totalPages}/>
                </Pagination>
            ) : ''}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={SkillsForm}
                title={'Edit Skills'}
                list={localSkills}
                handleItemChange={handleSkillChange}
                handleRemoveItem={handleRemoveSkill}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={SkillsForm}
                title={'Add Skill'}
                item={localSkills[localSkills.length - 1]}
                handleItemChange={handleSkillChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioSkills;