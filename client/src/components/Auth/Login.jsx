/**
 * The Login component
 */

import axios from 'axios';
import { useState } from  'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');  
    const [loginForm, setLoginForm] = useState({    //state for managing the login info
        email: '',
        password: ''
    });

    //event handler for updating the input fields in the form to show user input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //event handler for submitting the login form data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', loginForm);  //establishes a http connection to the specified endpoint

            if (response.data.success) {
                response.data.data.profileCreated ? navigate('/portfolio') : navigate('/form');   //navigates to either the form page or portfolio page after successfully logining in
            } else {
                setErrorMessage('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100" >
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center">Log In</h2>
                <br />
                <Row className="mb-3">
                    <Form.Group as={Col} md={12} controlId="email">
                        <FloatingLabel label="Email">
                            <Form.Control style={{width: '350px'}} type="email" name="email" value={loginForm.email} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md={12} controlId="password">
                        <FloatingLabel label="Password">
                            <Form.Control style={{width: '350px'}} type="password" name="password" value={loginForm.password} onChange={handleChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Button variant="outline-light" type="submit">Log In</Button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                <div className="mt-3">
                    <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </Form>
        </Container>
    );
}

export default Login;