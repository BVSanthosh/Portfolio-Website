/**
 * Project item Component
 */

function ProjectSection({project, handleProjectChange}) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProject = {
            ...project,
            [name]: value
        };

        handleProjectChange(updatedProject);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor={`project-title-${project.id}`} className="form-label"> 
                    Project Title: 
                </label>
                
                <input
                    type="text"
                    name="title"  
                    id={`project-title-${project.id}`}
                    value={project.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor={`achievements-${project.id}`} className="form-label"> 
                    Achievements: 
                </label>
                <br/>
                <textarea
                    name="achievements"
                    id={`achievements-${project.id}`}
                    value={project.achievements}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default ProjectSection;