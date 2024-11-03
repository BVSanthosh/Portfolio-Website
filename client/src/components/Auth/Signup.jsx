/**
 * The Signup component
 */

import axios from 'axios';
import { useState } from  'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [signupForm, setSignupForm] = useState({    //state for managing the signup info 
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    //function to ensure that the input is valid
    const validateInput= () => {
        const name_regex = /^[a-zA-Z][a-zA-Z'-]*(\s[a-zA-Z][a-zA-Z'-]*)*$|^[a-zA-Z][a-zA-Z'-]*(\s[A-Z][a-zA-Z'-]*)*$/
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_.])(?!.*\s)[A-Za-z\d!@#$%^&*_.]{8,}$/;

        
        if (!name_regex.test(signupForm.firstName)) {
            setErrorMessage('Invalid first name.');
            return false;
        }

        if (!name_regex.test(signupForm.lastName)) {
            setErrorMessage('Invalid last name.');
            return false;
        }

        if (!password_regex.test(signupForm.password)) {
            setErrorMessage(
                'Invalid Passowrd. Please ensure that the password ' +
                'is at least 8 characters long, ' +
                'contains at least one uppercase letter, ' +
                'contains at least one lowercase letter, ' +
                'contains at least one number, ' +
                'contains no whitespace'
            );
            return false;
        }

        return true;
    };

    //event handler for updating the input fields in the form to show user input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setSignupForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    //event handler for submitting the signup form data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/signup', signupForm);  //establishes a http connection to the specified endpoint

            if (response.data.success) {
                console.log('Signup successful:', response.data);
                navigate('/login');
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        } catch(error) {
            console.error('Error signing up:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center">Sign Up</h2>
                <br />
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="firstName">
                        <FloatingLabel label="First Name">
                            <Form.Control type="text" name="firstName" value={signupForm.firstName} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lastName">
                        <FloatingLabel label="Last Name">
                            <Form.Control type="text" name="lastName" value={signupForm.lastName} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                        <FloatingLabel label="Email">
                            <Form.Control type="email" name="email" value={signupForm.email} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="password">
                        <FloatingLabel label="Password">
                            <Form.Control type="password" name="password" value={signupForm.password} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Button variant="outline-light" type="submit">Sign Up</Button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                <div className="mt-3">
                    <p>Already have an account? <Link to="/login">Log In</Link></p>
                </div>
            </Form>
        </Container>
    );
}

export default Signup;