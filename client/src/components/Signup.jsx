/**
 * The Signup component
 */

import axios from 'axios';
import { useState } from  'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [signupForm, setsignupForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    //event handler for updating the input fields in the form to show user input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setsignupForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //event handler for submitting the signup form data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log(signupForm);
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
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">First Name:</label>
                    <input 
                        type="text"
                        name="firstName"
                        id="firstName"  
                        value={signupForm.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        id="lastName"  
                        value={signupForm.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"  
                        value={signupForm.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"  
                        value={signupForm.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </form>
            <div className="mt-3">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
}

export default Signup;