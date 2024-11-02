/**
 * Project item Component
 */

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ProjectForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProject = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedProject);
    };

    return (
        <Container>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`project-title-${item.id}`}>
                    <FloatingLabel label="Title"> 
                        <Form.Control
                            type="text"
                            name="title"  
                            value={item.title}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`achievements-${item.id}`}>
                    <FloatingLabel label="Achievements"> 
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="achievements"  
                            value={item.achievements}
                            onChange={handleChange}
                            style={{height:'100px'}}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    );
}

export default ProjectForm;