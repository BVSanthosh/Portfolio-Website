/**
 * Certification item Component
 */

function CertificationSection({certificate, handleCertificateChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedCertificate = {
            ...certificate,
            [name]: value
        };

        handleCertificateChange(updatedCertificate);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`title-${certificate.id}`} className="form-label"> 
                    Certification Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`title-${certificate.id}`}
                    value={certificate.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`org-${certificate.id}`} className="form-label"> 
                    Issuing Organisation: 
                </label>
                
                <input
                    type="text"
                    name="organisation"  
                    id={`org-${certificate.id}`}
                    value={certificate.organisation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`earned-date-${certificate.id}`} className="form-label"> 
                    Earned Date: 
                </label>
                
                <input
                    type="date"
                    name="earnedDate"  
                    id={`earned-date-${certificate.id}`}
                    value={certificate.earnedDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`description-${certificate.id}`} className="form-label"> 
                    Description: 
                </label>
                <br/>
                <textarea
                    name="description"
                    id={`description-${certificate.id}`}
                    value={certificate.description}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default CertificationSection;