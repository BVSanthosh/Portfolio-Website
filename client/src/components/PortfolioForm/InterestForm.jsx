/**
 * Interest Component
 */

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InterestForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedInterest = {
            ...item,
            interest: value
        };

        handleItemChange(updatedInterest);
    };

    return(
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`interest-${item.id}`}>
                    <Form.Control
                        type="text"
                        name="interest"
                        value={item.interest}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
        </>
    );
}

export default InterestForm;