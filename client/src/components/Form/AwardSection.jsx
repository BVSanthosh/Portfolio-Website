/**
 * Award item Component
 */

function AwardSection({ award, handleAwardChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedAward = {
            ...award,
            [name]: value
        };

        handleAwardChange(updatedAward);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${award.id}`} className="form-label"> 
                    Award Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`title-${award.id}`}
                    value={award.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`organisation-${award.id}`} className="form-label"> 
                    Organisation: 
                </label>
                
                <input
                    type="text"
                    name="organisation"  
                    id={`organisation-${award.id}`}
                    value={award.organisation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`date-awarded-${award.id}`} className="form-label"> 
                    Date Awarded: 
                </label>
                
                <input
                    type="date"
                    name="dateAwarded"  
                    id={`date-awarded-${award.id}`}
                    value={award.dateAwarded}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`description-${award.id}`} className="form-label"> 
                    Description: 
                </label>
                <br/>
                <textarea
                    name="description"
                    id={`description-${award.id}`}
                    value={award.description}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default AwardSection;