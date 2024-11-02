/**
 * Language Component
 */

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function LanguageForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedLanguage = {
            ...item,
            language: value
        };

        handleItemChange(updatedLanguage);
    };

    return(
        <Container>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`language-${item.id}`}>
                    <Form.Control
                        type="language"
                        name="skill"
                        value={item.language}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
        </Container>
    );
}

export default LanguageForm;