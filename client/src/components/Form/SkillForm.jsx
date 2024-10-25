/**
 * Skill Component
 */

function SkillForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedSkill = {
            ...item,
            name: value
        };

        handleItemChange(updatedSkill);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                aria-label="Skill"
                id={`skill-${item.id}`}
                name="skill"
                value={item.name}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default SkillForm;