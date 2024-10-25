/**
 * Experience item Component
 */

function ExperienceForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedExperience = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedExperience);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`job-title-${item.id}`} className="form-label"> 
                    Job Title: 
                </label>
                
                <input
                    type="text"
                    name="jobTitle"  
                    id={`job-title-${item.id}`}
                    value={item.jobTitle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`company-name-${item.id}`} className="form-label"> 
                    Company Name: 
                </label>
                
                <input
                    type="text"
                    name="companyName"  
                    id={`company-name-${item.id}`}
                    value={item.companyName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`location-${item.id}`} className="form-label"> 
                    Location: 
                </label>
                
                <input
                    type="text"
                    name="location"  
                    id={`location-${item.id}`}
                    value={item.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${item.id}`} className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    name="startDate"  
                    id={`start-date-${item.id}`}
                    value={item.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${item.id}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    name="endDate"  
                    id={`end-date-${item.id}`}
                    value={item.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${item.id}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    name="achievements"
                    aria-label="Achievements"
                    id={`achievements-${item.id}`}
                    value={item.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default ExperienceForm;