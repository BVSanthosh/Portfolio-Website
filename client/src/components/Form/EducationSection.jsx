import { useState } from 'react';

function ExperienceSection({ index, handleEducationChange }) {
    const [education, setEducation] = useState({
        id: index,
        qualification: "",
        institutionName: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEducation((prevState) => {
            const updatedEducation = {
                ...prevState,
                [name]: value
            };

            handleEducationChange(index, updatedEducation);
            return updatedEducation;
        });
    };

    return(
        <div>
            <div className="mb-3">
                <label htmlFor={`qualification-${index}`} className="form-label"> 
                    Qualification: 
                </label>
                
                <input
                    type="text"
                    id={`qualification-${index}`}
                    name="qualification"  
                    value={education.qualification}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`institution-name-${index}`} className="form-label"> 
                    Institution Name: 
                </label>
                
                <input
                    type="text"
                    id={`institution-name-${index}`}
                    name="institutionName" 
                    value={education.institutionName} 
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
                    id={`location-${index}`}
                    name="location"  
                    value={education.location}
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
                    id={`start-date-${index}`}
                    name="startDate" 
                    value={education.startDate} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`end-date-${index}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    id={`end-date-${index}`}
                    name="endDate"  
                    value={education.endDate}
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
                    id="achievements"
                    name={`achievements-${index}`}
                    value={education.achievements}
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