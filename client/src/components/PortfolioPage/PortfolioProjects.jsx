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
import { v4 as uuidv4 } from 'uuid';

import AddPopUp from './AddPopUp.jsx';
import EditList from './EditList.jsx';
import EditPopUp from './EditPopUp.jsx';
import ProjectsForm from '../PortfolioForm/ProjectsForm.jsx';

function PortfolioProjects({ projects, onSave }) {
    const [localProjects, setLocalProjects] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleProjectChange = (updatedProject) => {
        setLocalProjects(prevProjects => prevProjects.map(proj => proj.id == updatedProject.id ? updatedProject : proj));
    };

    const handleAddProject = () => {
        setLocalProjects([
            ...localProjects,
            {
                id: uuidv4(),
                title: '',
                achievements: ''
            }
        ]);
    };

    const handleRemoveProject = (project) => {
        setLocalProjects(localProjects.filter(proj => proj.id !== project.id));
    };

    const handleSave = () => {
        onSave(localProjects);
        persistProjectsChange(localProjects);
    };

    const toggleEdit = () => {
        setShowEdit(true);
    };

    const toggleAdd = () => {
        handleAddProject();
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
        setLocalProjects([...localProjects]);
        setShowAdd(false);
    };

    const cancelEdit = () => {
        setLocalProjects([...localProjects]);
        setShowEdit(false);
    };

    const persistProjectsChange = async (updatedProjects) => {
        try {
            const payload = {
                section: 'projects',
                data: updatedProjects,
            };

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', payload);

            if (response.data.success) {
                console.log('Projects section updated successfully');
            } else {
                console.error('Failed to update projects section. Please try again.');
            }
        } catch (error) {
            console.error('Error updating projects section:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container id="project">
            <Row>
                <Col>
                    <h2>Projects</h2>
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
                        disabled={!(projects && projects.length > 0)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Col>
            </Row>
            {projects && projects.length > 0 ? (
                projects.map((proj) => (
                    <Card key={proj.id} className="my-3" border="light" bg="dark" text="light">
                        <Card.Body>
                            <Card.Title>{proj.title}</Card.Title>
                            <Card.Text>{proj.achievements}</Card.Text>
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
                    Add Project
                </div>
            )}
            <EditPopUp
                ComponentList={EditList}
                ComponentEdit={ProjectsForm}
                title={'Edit Projects'}
                list={localProjects}
                handleItemChange={handleProjectChange}
                handleRemoveItem={handleRemoveProject}
                show={showEdit}
                toggle={cancelEdit}
                save={saveEdit}
            />
            <AddPopUp
                ComponentAdd={ProjectsForm}
                title={'Add Project'}
                item={localProjects[localProjects.length - 1]}
                handleItemChange={handleProjectChange}
                show={showAdd}
                toggle={cancelAdd}
                save={saveAdd}
            />
        </Container>
    );
}

export default PortfolioProjects;