/**
 * Certification Component
 */

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CertificationForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedCertificate = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedCertificate);
    };

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`title-${item.id}`}>
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
                <Form.Group as={Col} controlId={`org-${item.id}`}>
                    <FloatingLabel label="Issuing Organisation"> 
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
            <Form.Group as={Col} controlId={`earned-date-${item.id}`}>
                    <FloatingLabel label="Earned Date"> 
                        <Form.Control
                            type="date"
                            name="earnedDate"  
                            value={item.earnedDate}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`description-${item.id}`}>
                    <FloatingLabel label="Description"> 
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="description"  
                            value={item.description}
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

export default CertificationForm;