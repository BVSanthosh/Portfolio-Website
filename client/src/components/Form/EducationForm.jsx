import { useState } from 'react';

import ExperienceSection from './EducationSection.jsx';

function EducationForm() {
    const [educations, setEducations] = useState([]);

    const handleEducationChange = (index, updatedEducation) => {
        const newEducations = [...educations]
        newEducations[index] = updatedEducation;
        setEducations(newEducations);
    };

    const handleAddEducation = (newEducation) => {
        setEducations([
            ...educations,
            newEducation
        ]);
    };

    return (
        <div className="container mt-5">
            <h4>Education</h4>
            {educations.map((edu, index) => (
                <ExperienceSection 
                    key={index}
                    index={index}
                    handleEducationChange={handleEducationChange}
                />
            ))}
            <button className="btn btn-primary" type="button" onClick={() => handleAddEducation({})}>
                Add Education
            </button>

            <p>{JSON.stringify(educations, null, 2)}</p>
        </div>
    );
}

export default EducationForm;