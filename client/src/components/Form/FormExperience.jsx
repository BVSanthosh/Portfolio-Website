import { useState } from 'react';

function FormExperience() {
    const [experience, setExperience] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExperience((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="container mt-5">
            <h4>Work Experience</h4>
            <div className="mb-3">
                <label htmlFor="job-title" className="form-label"> 
                    Job Title: 
                </label>
                
                <input
                    type="text"
                    name="jobTitle"  
                    id="job-title"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="company-name" className="form-label"> 
                    Company Name: 
                </label>
                
                <input
                    type="text"
                    name="companyName"  
                    id="company-name"
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
                    value={experience.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(experience, null, 2)}</p>
        </div>
    );
}

export default FormExperience;