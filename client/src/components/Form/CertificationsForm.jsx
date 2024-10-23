/**
 * Certification List Component
 */

import CertificationSection from './CertificationSection.jsx';

function CertificationsForm({ certificates, handleCertificateChange, handleAddCertificate, handleRemoveCertificate }) {

    return (
        <div className="container mt-5">
            <h4>Certifications</h4>
            {certificates.map(cert => (
                <div key={cert.id} className="mb-3">
                    <CertificationSection 
                        certificate={cert}
                        handleCertificateChange={handleCertificateChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveCertificate(cert)}>
                        Delete Certificate
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddCertificate}>
                Add Certificate
            </button>
        </div>
    );
}

export default CertificationsForm;