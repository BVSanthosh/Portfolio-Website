import { useState } from 'react';

function FormSkills() {
    const [skills, setSkills] = useState();

    const handleChange = (e) => {
        setSkills(e.target.value);
    }

    return (
        <div className="container mt-5">
            <h4>Skills</h4>
            <div className="mb-3">
                <textarea
                    id="summary"
                    value={skills}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(skills, null, 2)}</p>
        </div>
    );
}

export default FormSkills;