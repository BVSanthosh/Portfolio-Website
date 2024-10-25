/**
 * Education Component
 */

function ExperienceForm({ item, handleItemChange }) {
    
    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedEducation = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedEducation);
    };

    return(
        <div>
            <div className="mb-3">
                <label htmlFor={`qualification-${item.id}`} className="form-label"> 
                    Qualification: 
                </label>
                
                <input
                    type="text"
                    id={`qualification-${item.id}`}
                    name="qualification"  
                    value={item.qualification}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`institution-name-${item.id}`} className="form-label"> 
                    Institution Name: 
                </label>
                
                <input
                    type="text"
                    id={`institution-name-${item.id}`}
                    name="institutionName" 
                    value={item.institutionName} 
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
                    id={`location-${item.id}`}
                    name="location"  
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
                    id={`start-date-${item.id}`}
                    name="startDate" 
                    value={item.startDate} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`end-date-${item.id}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    id={`end-date-${item.id}`}
                    name="endDate"  
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
                    id="achievements"
                    aria-label="Achievements"
                    name={`achievements-${item.id}`}
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