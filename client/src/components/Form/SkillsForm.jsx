import SkillSection from './SkillSection.jsx';

function SkillsForm({ skills, handleSkillChange, handleAddSkill, handleRemoveSkill }) {
    
    return (
        <div className="container mt-5">
            <h4>Skills</h4>
            {skills.map((skill) => (
                <div key={skill.id} className="mb-3">
                    <SkillSection 
                        key={skill.id}
                        skill={skill}
                        handleSkillChange={handleSkillChange}
                    />
                    <button key={skill.id} className="btn btn-primary" type="button" onClick={() => handleRemoveSkill(skill)}>
                        Delete Skill
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddSkill}>
                Add Skill
            </button>
        </div>
    );
}

export default SkillsForm;