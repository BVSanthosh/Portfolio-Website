import axios from 'axios';
import { useState } from  'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [cvForm, setloginForm] = useState({});

    return (
        <>
        </>
    );
}

export default Form;