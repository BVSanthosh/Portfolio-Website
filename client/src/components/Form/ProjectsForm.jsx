/**
 * Projects List Component
 */

import ProjectSection from './ProjectSection.jsx';

function ProjectsForm({ projects, handleProjectChange, handleAddProject, handleRemoveProject }) {

    return (
        <div className="container mt-5">
            <h4>Projects</h4>
            {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <ProjectSection 
                        project={proj}
                        handleProjectChange={handleProjectChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveProject(proj)}>
                        Delete Project
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddProject}>
                Add Project
            </button>
        </div>
    );
}

export default ProjectsForm;