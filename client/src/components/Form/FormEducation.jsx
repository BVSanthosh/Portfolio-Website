import { useState } from 'react';

function FormEducation() {
    const [education, setEducation] = useState({
        qualification: "",
        institutionName: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEducation((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="container mt-5">
            <h4>Education</h4>
            <div className="mb-3">
                <label htmlFor="qualification" className="form-label"> 
                    Qualification: 
                </label>
                
                <input
                    type="text"
                    name="qualification"  
                    id="qualification"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="institution-name" className="form-label"> 
                    Institution Name: 
                </label>
                
                <input
                    type="text"
                    name="institutionName"  
                    id="institution-name"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label"> 
                    Location: 
                </label>
                
                <input
                    type="text"
                    name="location"  
                    id="location"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="start-date" className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    name="startDate"  
                    id="start-date"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="end-date" className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    name="endDate"  
                    id="end-date"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="achievements" className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    id="achievements"
                    name="achievements"
                    value={education.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(education, null, 2)}</p>
        </div>
    );
}

export default FormEducation;