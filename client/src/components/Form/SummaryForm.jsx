function SummaryForm({ handleSummaryChange }) {

    return (
        <div className="container mt-5">
            <h4>Professional Summary</h4>
            <div className="mb-3">
                <textarea
                    id="summary"
                    name="summary"
                    onChange={handleSummaryChange}
                    rows="4" 
                    cols="50"
                    required
                />
            </div>
        </div>
    );
}

export default SummaryForm;