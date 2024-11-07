
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import AddPopUp from './AddPopUp.jsx';
import SummaryForm from '../PortfolioForm/SummaryForm.jsx';
import ppImage from './img/pp.png';


function PortfolioAbout({ about, contact, handleAboutChange}) {
    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    const save = () => {
        setShow(!show);
        persistChange();
    };

    const persistChange = async () => {
        try {
            const updatedAbout = {
                section: 'about',
                data: about
            }

            const response = await axios.put('http://localhost:5000/api/v1/user/portfolio/update', updatedAbout);

            if (response.data.success) {
                console.log('About section updated successfully');
            } else {
                console.error('Failed to update about section. Please try again.');
            }
        } catch(error) {
            console.error('Error updating about seection:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Image fluid src={ppImage}/>
                </Col>
                <Col>
                    <Row className="mb-2">
                        <Col>
                            <h2>About Me</h2>
                        </Col>
                        <Col className="d-flex flex-row-reverse mb-3">
                            <Button type="button" size="sm" variant="outline-light" className="mx-1" onClick={toggle} disabled={about}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                            <Button type="button" size="sm" variant="outline-light" className="mx-1" disabled={!about}>
                                <FontAwesomeIcon icon={faEdit} onClick={toggle}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        {about ? (
                            <p>{about}</p>
                        ) : (
                            <div style={{border: "1px solid #fff", padding: "10px", display: "flex", justifyContent: "center", borderRadius: "6px" }}>
                                Add About
                            </div>
                        )}
                    </Row>
                    <Row className="mb-2">
                        <NavDropdown title="Contact">
                            <NavDropdown.Item href="#email">{contact.email}</NavDropdown.Item>
                            <NavDropdown.Item href="#phone">{contact.phoneNumber}</NavDropdown.Item>
                            <NavDropdown.Item href="#linkedin">{contact.linkedIn}</NavDropdown.Item>
                        </NavDropdown>
                    </Row>
                </Col>
            </Row>
            {show && <AddPopUp ComponentAdd={SummaryForm} title={'Add Professional Summary'} item={about} handleItemChange={handleAboutChange} show={show} toggle={toggle} save={save}/>}
        </Container>
    );
}

export default PortfolioAbout;