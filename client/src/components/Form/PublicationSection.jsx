/**
 * Publication item Component
 */

function PublicationSection({ publication, handlePublicationChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPublication = {
            ...publication,
            [name]: value
        };

        handlePublicationChange(updatedPublication);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${publication.id}`} className="form-label"> 
                    Publication Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`title-${publication.id}`}
                    value={publication.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`company-name-${publication.id}`} className="form-label"> 
                    Date Published: 
                </label>
                
                <input
                    type="date"
                    name="datePublished"  
                    id={`company-name-${publication.id}`}
                    value={publication.datePublished}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`link-${publication.id}`} className="form-label"> 
                    Link: 
                </label>
                
                <input
                    type="text"
                    name="link"  
                    id={`link-${publication.id}`}
                    value={publication.link}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`description-${publication.id}`} className="form-label"> 
                    Description: 
                </label>
                <br/>
                <textarea
                    name="description"
                    id={`description-${publication.id}`}
                    value={publication.description}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default PublicationSection;