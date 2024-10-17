import ExperienceSection from './ExperienceSection.jsx';

function ExperienceForm({ experiences, handleExperienceChange, handleAddExperience }) {
    
    return (
        <div className="container mt-5">
            <h4>Work Experience</h4>
            {experiences.map((exp, index) => (
                <ExperienceSection 
                    key={index} 
                    index={index} 
                    handleExperienceChange={handleExperienceChange} 
                />
            ))}
            <button className="btn btn-primary" type="button" onClick={() => handleAddExperience({})}>
                Add Experience
            </button>
        </div>
    );
}

export default ExperienceForm;