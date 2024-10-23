/**
 * Interest item Component
 */

function InterestSection({ interest, handleInterestChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedInterest = {
            ...interest,
            interest: value
        };

        handleInterestChange(updatedInterest);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                id={`interest-${interest.id}`}
                name="interest"
                value={interest.interest}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default InterestSection;