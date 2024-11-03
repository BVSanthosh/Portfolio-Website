/**
 * Experience Component
 */

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ExperienceForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedExperience = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedExperience);
    };

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`job-title-${item.id}`}>
                    <FloatingLabel label="Job Title"> 
                        <Form.Control
                            type="text"
                            name="jobTitle"  
                            value={item.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId={`company-title-${item.id}`}>
                    <FloatingLabel label="Company Name"> 
                        <Form.Control
                            type="text"
                            name="companyName"  
                            value={item.companyName}
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
                            name="jobTitle"  
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