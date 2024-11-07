/**
 * Volunteer Experience Component
 */

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function VolunteerForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedVolunteerExp = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedVolunteerExp);
    };

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`position-${item.id}`}>
                    <FloatingLabel label="Position"> 
                        <Form.Control
                            type="text"
                            name="position"  
                            value={item.position}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId={`organisation-${item.id}`}>
                    <FloatingLabel label="Organisation"> 
                        <Form.Control
                            type="text"
                            name="organisation"  
                            value={item.organisation}
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
                            value={item.endDate}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`responsibilities-${item.id}`}>
                    <FloatingLabel label="Responsibilities"> 
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="responsibilities"  
                            value={item.responsibilities}
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

export default VolunteerForm;