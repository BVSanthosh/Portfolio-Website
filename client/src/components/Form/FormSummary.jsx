import { useState } from 'react';

function FormSummary() {
    const [summary, setSummary] = useState();

    const handleChange = (e) => {
        setSummary(e.target.value);
    }

    return (
        <div className="container mt-5">
            <h4>Professional Summary</h4>
            <div className="mb-3">
                <textarea
                    id="summary"
                    name="summary"
                    value={summary}
                    onChange={handleChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
            
            <p>{JSON.stringify(summary, null, 2)}</p>
        </div>
    );
}

export default FormSummary;