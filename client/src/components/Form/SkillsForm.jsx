import { useState } from 'react';

import SkillSection from './SkillSection.jsx';

function SkillsForm() {
    const [skills, setSkills] = useState([]);

    const handleSkillChange = (index, updatedSkill) => {
        const newSkills = [...skills];
        newSkills[index] = updatedSkill;
        setSkills(newSkills);
    }

    const handleAddSkill = (newSkill) => {
        setSkills([
            ...skills,
            newSkill
        ]);
    }

    return (
        <div className="container mt-5">
            <h4>Skills</h4>
            {skills.map((skill, index) => (
                <SkillSection 
                    key={index}
                    index={index}
                    handleSkillChange={handleSkillChange}
                />
            ))}
            <button className="btn btn-primary" type="button" onClick={() => handleAddSkill("")}>
                Add Skill
            </button>

            <p>{JSON.stringify(skills, null, 2)}</p>
        </div>
    );
}

export default SkillsForm;