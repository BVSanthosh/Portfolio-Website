function ExperienceSection({ education, handleEducationChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedEducation = {
            ...education,
            [name]: value
        };

        handleEducationChange(updatedEducation);
    };

    return(
        <div>
            <div className="mb-3">
                <label htmlFor={`qualification-${education.id}`} className="form-label"> 
                    Qualification: 
                </label>
                
                <input
                    type="text"
                    id={`qualification-${education.id}`}
                    name="qualification"  
                    value={education.qualification}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`institution-name-${education.id}`} className="form-label"> 
                    Institution Name: 
                </label>
                
                <input
                    type="text"
                    id={`institution-name-${education.id}`}
                    name="institutionName" 
                    value={education.institutionName} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`location-${education.id}`} className="form-label"> 
                    Location: 
                </label>
                
                <input
                    type="text"
                    id={`location-${education.id}`}
                    name="location"  
                    value={education.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${education.id}`} className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    id={`start-date-${education.id}`}
                    name="startDate" 
                    value={education.startDate} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`end-date-${education.id}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    id={`end-date-${education.id}`}
                    name="endDate"  
                    value={education.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${education.id}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    id="achievements"
                    name={`achievements-${education.id}`}
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