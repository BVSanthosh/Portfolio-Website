/**
 * Publication item Component
 */

function PublicationForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPublication = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedPublication);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${item.id}`} className="form-label"> 
                    Publication Title: 
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
                <label htmlFor={`company-name-${item.id}`} className="form-label"> 
                    Date Published: 
                </label>
                
                <input
                    type="date"
                    name="datePublished"  
                    id={`company-name-${item.id}`}
                    value={item.datePublished}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`link-${item.id}`} className="form-label"> 
                    Link: 
                </label>
                
                <input
                    type="text"
                    name="link"  
                    id={`link-${item.id}`}
                    value={item.link}
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

export default PublicationForm;