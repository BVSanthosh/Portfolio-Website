/**
 * Skill Component
 */

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function SkillForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedSkill = {
            ...item,
            name: value
        };

        handleItemChange(updatedSkill);
    };

    return(
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={`achievements-${item.id}`}>
                    <Form.Control
                        type="text"
                        name="skill"
                        value={item.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
        </>
    );
}

export default SkillForm;