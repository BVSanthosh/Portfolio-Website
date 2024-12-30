/**
 * Publications Component
 */

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PublicationsForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPublication = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedPublication);
    };

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`title-${item.id}`}>
                    <FloatingLabel label="Publication Title"> 
                        <Form.Control
                            type="text"
                            name="title"  
                            value={item.title}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId={`date-published-${item.id}`}>
                    <FloatingLabel label="Start Date"> 
                        <Form.Control
                            type="date"
                            name="datePublished"  
                            value={item.datePublished}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`link-${item.id}`}>
                    <FloatingLabel label="Link"> 
                        <Form.Control
                            type="text"
                            name="link"  
                            value={item.link}
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

export default PublicationsForm;