import { useState } from 'react';

function SkillSection({ index, handleSkillChange }) {
    const [skill, setSkill] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        handleSkillChange(index, value);
        setSkill(value);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                id={`skill-${index}`}
                name="skill"
                value={skill}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default SkillSection;