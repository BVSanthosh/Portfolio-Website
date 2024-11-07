/**
 * Summary Component
 */

import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function SummaryForm({ item, handleItemChange }) {

    return (
        <Container>
            <h4>Professional Summary</h4>
            <FloatingLabel label="Summary" controlId="summary">
                <Form.Control
                    as="textarea"
                    name="summary"
                    value={item}
                    onChange={handleItemChange}
                    style={{ height: '100px' }}
                    required
                />
            </FloatingLabel>
        </Container>
    );
}

export default SummaryForm;