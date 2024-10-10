import axios from 'axios';
import { useState } from  'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [profileData, setProfileData] = useState({});

    return (
        <>
            <p>to be implemented</p>
        </>
    );
}

export default Profile;