/**
 * Volunteer Experience item Component
 */

function VolunteerSection({ volunteerExp, handleVolunteerExpChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedVolunteerExp = {
            ...volunteerExp,
            [name]: value
        };

        handleVolunteerExpChange(updatedVolunteerExp);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`position-${volunteerExp.id}`} className="form-label"> 
                    Position: 
                </label>
                
                <input
                    type="text"
                    name="position"  
                    id={`position-${volunteerExp.id}`}
                    value={volunteerExp.position}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`organisation-${volunteerExp.id}`} className="form-label"> 
                    Organisation: 
                </label>
                
                <input
                    type="text"
                    name="organisation"  
                    id={`organisation-${volunteerExp.id}`}
                    value={volunteerExp.organisation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`start-date-${volunteerExp.id}`} className="form-label"> 
                    Start Date: 
                </label>
                
                <input
                    type="date"
                    name="startDate"  
                    id={`start-date-${volunteerExp.id}`}
                    value={volunteerExp.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`end-date-${volunteerExp.id}`} className="form-label"> 
                    End Date: 
                </label>
                
                <input
                    type="date"
                    name="endDate"  
                    id={`end-date-${volunteerExp.id}`}
                    value={volunteerExp.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`responsibilities-${volunteerExp.id}`} className="form-label"> 
                    Responsibilities: 
                </label>
                <br/>
                <textarea
                    name="responsibilities"
                    id={`responsibilities-${volunteerExp.id}`}
                    value={volunteerExp.responsibilities}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default VolunteerSection;