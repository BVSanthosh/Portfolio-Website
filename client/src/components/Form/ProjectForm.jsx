/**
 * Project item Component
 */

function ProjectForm({item, handleItemChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProject = {
            ...item,
            [name]: value
        };

        handleItemChange(updatedProject);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`project-title-${item.id}`} className="form-label"> 
                    Project Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`project-title-${item.id}`}
                    value={item.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${item.id}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    name="achievements"
                    aria-label="Achievements"
                    id={`achievements-${item.id}`}
                    value={item.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default ProjectForm;