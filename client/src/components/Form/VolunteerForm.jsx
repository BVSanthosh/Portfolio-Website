/**
 * Volunteer Experience List Component
 */

import VolunteerSection from './VolunteerSection.jsx';

function VolunteerForm({ volunteerExps, handleVolunteerExpChange, handleAddVolunteerExp, handleRemoveVolunteerExp }) {

    return (
        <div className="container mt-5">
            <h4>Volunteer Experience</h4>
            {volunteerExps.map(vol => (
                <div key={vol.id} className="mb-3">
                    <VolunteerSection 
                        volunteerExp={vol}
                        handleVolunteerExpChange={handleVolunteerExpChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveVolunteerExp(vol)}>
                        Delete Volunteer Experience
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddVolunteerExp}>
                Add Volunteer Experience
            </button>
        </div>
    );
}

export default VolunteerForm;