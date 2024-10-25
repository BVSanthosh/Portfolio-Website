/**
 * Award item Component
 */

function AwardForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedAward = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedAward);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${item.id}`} className="form-label"> 
                    Award Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`title-${item.id}`}
                    value={item.title}
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
                <label htmlFor={`date-awarded-${item.id}`} className="form-label"> 
                    Date Awarded: 
                </label>
                
                <input
                    type="date"
                    name="dateAwarded"  
                    id={`date-awarded-${item.id}`}
                    value={item.dateAwarded}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`description-${item.id}`} className="form-label"> 
                    Description: 
                </label>
                <br/>
                <textarea
                    name="description"
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default AwardForm;