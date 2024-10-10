import axios from 'axios';
import { useState } from  'react';
import { useNavigate } from 'react-router-dom';

function CvExport() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [cvForm, setCvForm] = useState({});

    return (
        <>
            <p>to be implemented</p>
        </>
    );
}

export default CvExport;