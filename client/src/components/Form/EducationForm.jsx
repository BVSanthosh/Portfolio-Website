import ExperienceSection from './EducationSection.jsx';

function EducationForm({ educations, handleEducationChange, handleAddEducation, handleRemoveEducation }) {
    
    return (
        <div className="container mt-5">
            <h4>Education</h4>
            {educations.map((edu) => (
                <div key={edu.id} className="mb-3"> 
                    <ExperienceSection 
                        key={edu.id}
                        education={edu}
                        handleEducationChange={handleEducationChange}
                    />
                    <button key={edu.id} className="btn btn-primary" type="button" onClick={() => handleRemoveEducation(edu)}>
                        Delete Education
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddEducation}>
                Add Education
            </button>
        </div>
    );
}

export default EducationForm;