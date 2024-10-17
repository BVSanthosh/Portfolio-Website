// FormContact.jsx
import { useState } from 'react';

function ContactForm() {
    const [contactInfo, setContactInfo] = useState({
        fullName: '',  
        email: '',
        phoneNumber: '',  
        linkedin: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setContactInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="container mt-5">
            <h4>Contact Information</h4>
            <div className="mb-3">
                <label htmlFor="full-name" className="form-label"> 
                    Full Name: 
                </label>
                
                <input
                    type="text"
                    name="fullName"  
                    id="full-name"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label"> 
                    Email:
                </label>
                <input
                    type="email"  
                    name="email"
                    id="email"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone-number" className="form-label"> 
                    Phone Number:
                </label>
                <input
                    type="tel"  
                    name="phoneNumber"  
                    id="phone-number"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="linkedin" className="form-label"> 
                    LinkedIn:
                </label>
                <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    onChange={handleChange}
                    required
                />
            </div>
            <p>{JSON.stringify(contactInfo, null, 2)}</p>
        </div>
    );
}

export default ContactForm;