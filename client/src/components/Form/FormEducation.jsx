import { useState } from 'react';

function FormEducation() {
    const [education, setEducation] = useState();

    const handleChange = (e) => {
        setEducation(e.target.value);
    }

    return (
        <div className="container mt-5">
            <h4>Education</h4>
            <div className="mb-3">
                <textarea
                    id="summary"
                    value={education}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(education, null, 2)}</p>
        </div>
    );
}

export default FormEducation;