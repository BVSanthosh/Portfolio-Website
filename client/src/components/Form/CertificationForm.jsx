/**
 * Certification item Component
 */

function CertificationForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedCertificate = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedCertificate);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${item.id}`} className="form-label"> 
                    Certification Title: 
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
                <label htmlFor={`org-${item.id}`} className="form-label"> 
                    Issuing Organisation: 
                </label>
                
                <input
                    type="text"
                    name="organisation"  
                    id={`org-${item.id}`}
                    value={item.organisation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`earned-date-${item.id}`} className="form-label"> 
                    Earned Date: 
                </label>
                
                <input
                    type="date"
                    name="earnedDate"  
                    id={`earned-date-${item.id}`}
                    value={item.earnedDate}
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
                    aria-label="Description"
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

export default CertificationForm;