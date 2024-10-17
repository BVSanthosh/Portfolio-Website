import ExperienceSection from './EducationSection.jsx';

function EducationForm({ educations, handleEducationChange, handleAddEducation }) {
    
    return (
        <div className="container mt-5">
            <h4>Education</h4>
            {educations.map((edu, index) => (
                <ExperienceSection 
                    key={index}
                    index={index}
                    handleEducationChange={handleEducationChange}
                />
            ))}
            <button className="btn btn-primary" type="button" onClick={() => handleAddEducation({})}>
                Add Education
            </button>
        </div>
    );
}

export default EducationForm;