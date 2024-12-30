/**
 * Contact Information Component
 */

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ContactForm({ item, handleItemChange, handleFileChange }) {

    return (
        <Container>
            <h4>Contact Information</h4>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="profileImage">
                    <Form.Control
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        name="profileImage"
                        onChange={handleFileChange}
                        style={{ height: '100%' }}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="firstName">
                    <FloatingLabel label="First Name">
                        <Form.Control
                            type="text"
                            name="firstName"  
                            value={item.firstName}
                            onChange={handleItemChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                    <FloatingLabel label="Last Name">
                        <Form.Control
                            type="text"
                            name="lastName"  
                            value={item.lastName}
                            onChange={handleItemChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                    <FloatingLabel label="Email">
                        <Form.Control
                            type="email"
                            name="email"  
                            value={item.email}
                            onChange={handleItemChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="phoneNumber">
                    <FloatingLabel label="Phone Number">
                        <Form.Control
                            type="tel"
                            name="phoneNumber"  
                            value={item.phoneNumber}
                            onChange={handleItemChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="location">
                    <FloatingLabel label="Location">
                        <Form.Control
                            type="text"
                            name="location"
                            value={item.location}
                            onChange={handleItemChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="linkedIn">
                    <FloatingLabel label="LinkedIn">
                        <Form.Control
                            type="text"
                            name="linkedIn"  
                            value={item.linkedIn}
                            onChange={handleItemChange}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    );
}

export default ContactForm;