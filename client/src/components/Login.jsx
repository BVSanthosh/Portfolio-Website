/**
 * The Login component
 */

import axios from 'axios';
import { useState } from  'react';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loginForm, setloginForm] = useState({
        email: '',
        password: ''
    });

    //event handler for updating the input fields in the form to show user input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setloginForm((prevData) => ({
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
                console.log('Login successful:', response.data);
                navigate('/form');
            } else {
                setErrorMessage('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="container mt-5">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input 
                        type="text"
                        id="email" 
                        name="email"
                        value={loginForm.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input 
                        type="password"
                        id="password" 
                        name="password"
                        value={loginForm.password}
                        onChange={handleChange}
                        className="form-control" 
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            </form>
            <div className="mt-3">
                <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login;