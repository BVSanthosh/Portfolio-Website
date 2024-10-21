import ExperienceSection from './ExperienceSection.jsx';

function ExperienceForm({ experiences, handleExperienceChange, handleAddExperience, handleRemoveExperience }) {

    return (
        <div className="container mt-5">
            <h4>Work Experience</h4>
            {experiences.map(exp => (
                <div key={exp.id} className="mb-3">
                    <ExperienceSection 
                        experience={exp}
                        handleExperienceChange={handleExperienceChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveExperience(exp)}>
                        Delete Experience
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddExperience}>
                Add Experience
            </button>
        </div>
    );
}

export default ExperienceForm;