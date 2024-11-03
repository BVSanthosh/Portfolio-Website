/**
 *  Component for generating a given form section as a list
 */

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function GenerateSections({ Component, title, list, handleItemChange, handleAddItem, handleRemoveItem }) {

    return (
        <Container>
            <div className="mb-3">
                <h4>{title}</h4>
                {list.map(item => (
                    <Row key={item.id} className="mb-3">
                        <Col>
                            <Component 
                                item={item}
                                handleItemChange={handleItemChange} 
                            />
                            <Button variant="outline-light" type="button" onClick={() => handleRemoveItem(item)}>
                                Delete {title}
                            </Button>
                        </Col>
                    </Row>
                ))}
                
                <Button variant="outline-light" type="button" onClick={handleAddItem}>
                    Add {title}
                </Button>
            </div>
        </Container>
    );
}

export default GenerateSections;