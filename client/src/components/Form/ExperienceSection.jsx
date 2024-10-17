import { useState } from 'react';

function ExperienceSection({index, handleExperienceChange}) {
    const [experience, setExperience] = useState({
        id: index,
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExperience((prevState) => {
            const updatedExperience = {
                ...prevState,
                [name]: value
            };

            handleExperienceChange(index, updatedExperience);
            return updatedExperience;
        });
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`job-title-${index}`} className="form-label"> 
                    Job Title: 
                </label>
                
                <input
                    type="text"
                    name="jobTitle"  
                    id={`job-title-${index}`}
                    value={experience.jobTitle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`company-name-${index}`} className="form-label"> 
                    Company Name: 
                </label>
                
                <input
                    type="text"
                    name="companyName"  
                    id={`company-name-${index}`}
                    value={experience.companyName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`location-${index}`} className="form-label"> 
                    Location: 
                </label>
                
                <input
                    type="text"
                    name="location"  
                    id={`location-${index}`}
                    value={experience.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${index}`} className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    name="startDate"  
                    id={`start-date-${index}`}
                    value={experience.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${index}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    name="endDate"  
                    id={`end-date-${index}`}
                    value={experience.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${index}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    name="achievements"
                    id={`achievements-${index}`}
                    value={experience.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default ExperienceSection;