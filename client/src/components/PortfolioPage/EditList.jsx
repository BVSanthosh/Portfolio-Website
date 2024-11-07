
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function EditList({ Component, list, handleItemChange, handleRemoveItem }) {

    return (
        <Container>
            <div className="mb-3">
                {list.map(item => (
                    <Row key={item.id} className="mb-3">
                        <Col>
                            <Component 
                                item={item}
                                handleItemChange={handleItemChange} 
                            />
                        </Col>
                        <Col md="auto">
                            <Button variant="outline-light" size="sm" type="button" onClick={() => handleRemoveItem(item)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Col>
                    </Row>
                ))}
            </div>
        </Container>
    );
}

export default EditList;