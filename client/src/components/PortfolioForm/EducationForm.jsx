/**
 * Education Component
 */

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ExperienceForm({ item, handleItemChange }) {
    
    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedEducation = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedEducation);
    };

    return(
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`qualification-${item.id}`}>
                    <FloatingLabel label="Qualification"> 
                        <Form.Control
                            type="text"
                            name="qualification"  
                            value={item.qualification}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId={`institution-name-${item.id}`}>
                    <FloatingLabel label="Institution Name"> 
                        <Form.Control
                            type="text"
                            name="institutionName"  
                            value={item.institutionName}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`location-${item.id}`}>
                    <FloatingLabel label="Location"> 
                        <Form.Control
                            type="text"
                            name="location"  
                            value={item.location}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`start-date-${item.id}`}>
                    <FloatingLabel label="Start Date"> 
                        <Form.Control
                            type="date"
                            name="startDate"  
                            value={item.startDate}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId={`end-date-${item.id}`}>
                    <FloatingLabel label="End Date"> 
                        <Form.Control
                            type="date"
                            name="endDate"  
                            value={item.startDate}
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
        </>
    );
}

export default ExperienceForm;