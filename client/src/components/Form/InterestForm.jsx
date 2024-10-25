/**
 * Interest Component
 */

function InterestForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedInterest = {
            ...item,
            interest: value
        };

        handleItemChange(updatedInterest);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                aria-label="Interest"
                id={`interest-${item.id}`}
                name="interest"
                value={item.interest}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default InterestForm;