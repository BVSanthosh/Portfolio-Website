/**
 * Volunteer Experience Component
 */

function VolunteerForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedVolunteerExp = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedVolunteerExp);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`position-${item.id}`} className="form-label"> 
                    Position: 
                </label>
                
                <input
                    type="text"
                    name="position"  
                    id={`position-${item.id}`}
                    value={item.position}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`organisation-${item.id}`} className="form-label"> 
                    Organisation: 
                </label>
                
                <input
                    type="text"
                    name="organisation"  
                    id={`organisation-${item.id}`}
                    value={item.organisation}
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
                <label htmlFor={`end-date-${item.id}`} className="form-label"> 
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
                <label htmlFor={`responsibilities-${item.id}`} className="form-label"> 
                    Responsibilities: 
                </label>
                <br/>
                <textarea
                    name="responsibilities"
                    aria-label="Responsibilities"
                    id={`responsibilities-${item.id}`}
                    value={item.responsibilities}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default VolunteerForm;