import SkillSection from './SkillSection.jsx';

function SkillsForm({ skills, handleSkillChange, handleAddSkill }) {
    
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
        </div>
    );
}

export default SkillsForm;