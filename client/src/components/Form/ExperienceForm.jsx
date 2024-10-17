import { useState } from 'react';

import ExperienceSection from './ExperienceSection.jsx';

function ExperienceForm() {
    const [experiences, setExperiences] = useState([]);

    
    const handleExperienceChange  = (index, updatedExperience) => {
        const newExperiences = [...experiences];
        newExperiences[index] = updatedExperience; 
        setExperiences(newExperiences);
    };
    
    const handleAddExperience = (newExperience) => {
        setExperiences([
            ...experiences,
            newExperience
        ]);
    };

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
            <p>{JSON.stringify(experiences, null, 2)}</p>
        </div>
    );
}

export default ExperienceForm;