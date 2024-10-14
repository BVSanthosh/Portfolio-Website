import { useState } from 'react';

function FormExperience() {
    const [experience, setExperience] = useState();

    const handleChange = (e) => {
        setExperience(e.target.value);
    }

    return (
        <div className="container mt-5">
            <h4>Work Experience</h4>
            <div className="mb-3">
                <textarea
                    id="summary"
                    value={experience}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(experience, null, 2)}</p>
        </div>
    );
}

export default FormExperience;