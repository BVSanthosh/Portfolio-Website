/**
 * Skill item Component
 */

function SkillSection({ skill, handleSkillChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedSkill = {
            ...skill,
            name: value
        };

        handleSkillChange(updatedSkill);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                id={`skill-${skill.id}`}
                name="skill"
                value={skill.name}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default SkillSection;