/**
 * Experience item Component
 */

function ExperienceSection({experience, handleExperienceChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedExperience = {
            ...experience,
            [name]: value
        };

        handleExperienceChange(updatedExperience);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`job-title-${experience.id}`} className="form-label"> 
                    Job Title: 
                </label>
                
                <input
                    type="text"
                    name="jobTitle"  
                    id={`job-title-${experience.id}`}
                    value={experience.jobTitle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`company-name-${experience.id}`} className="form-label"> 
                    Company Name: 
                </label>
                
                <input
                    type="text"
                    name="companyName"  
                    id={`company-name-${experience.id}`}
                    value={experience.companyName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`location-${experience.id}`} className="form-label"> 
                    Location: 
                </label>
                
                <input
                    type="text"
                    name="location"  
                    id={`location-${experience.id}`}
                    value={experience.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${experience.id}`} className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    name="startDate"  
                    id={`start-date-${experience.id}`}
                    value={experience.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${experience.id}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    name="endDate"  
                    id={`end-date-${experience.id}`}
                    value={experience.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${experience.id}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    name="achievements"
                    id={`achievements-${experience.id}`}
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