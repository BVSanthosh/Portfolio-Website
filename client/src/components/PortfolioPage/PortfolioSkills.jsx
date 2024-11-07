
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

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import SkillForm from '../PortfolioForm/SkillForm.jsx';

function PortfolioSkills({ skills, handleSkillChange, handleAddSkill, handleRemoveSkill }) {
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

    const toggleEdit = () => setShowEdit(!showEdit);
    
    const toggleAdd = () => {
        handleAddSkill();
        setShowAdd(!showAdd);
    };

    const saveEdit = () => {
        setShowEdit(!showEdit);
        persistSkillChange();
    };

    const saveAdd = () => {
        setShowAdd(!showAdd);
        persistSkillChange();
    };

    const persistSkillChange = async () => {
        try {
            const updatedSkills = {
                section: 'skills',
                data: skills
            }

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', updatedSkills);

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
                    <h2>Skills</h2>
                </Col>
                <Col className="d-flex flex-row-reverse my-2">
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleAdd}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggleEdit} disabled={!(skills && skills.length > 0)}>
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
                    <div style={{border: "1px solid #fff", padding: "10px", display: "flex", justifyContent: "center", borderRadius: "6px" }}>
                        Add Skill
                    </div>
            )}
            {skills && skills.length > 0 ? (<Pagination className="justify-content-center">
                <Pagination.First onClick={() => setPage(1)} disabled={page==1}/>
                <Pagination.Prev onClick={handlePrevPage} disabled={page==1}/>
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={handleNextPage} disabled={page==totalPages}/>
                <Pagination.Last onClick={() => setPage(totalPages)} disabled={page==totalPages}/>
            </Pagination> ) : ''}
            {showEdit && <EditPopUp ComponentList={EditList} ComponentEdit={SkillForm} title={'Edit Experience'} list={skills} handleItemChange={handleSkillChange} handleRemoveItem={handleRemoveSkill} show={showEdit} toggle={toggleEdit} save={saveEdit}/>}
            {showAdd && <AddPopUp ComponentAdd={SkillForm} title={'Add Experience'} item={skills[skills.length - 1]} handleItemChange={handleSkillChange} show={showAdd} toggle={toggleAdd} save={saveAdd}/>}
        </Container>
    );
}

export default PortfolioSkills;