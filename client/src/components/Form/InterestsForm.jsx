/**
 * Inerests List Component
 */

import InterestSection from './InterestSection.jsx';

function InterestsForm({ interests, handleInterestChange, handleAddInterest, handleRemoveInterest }) {

    return (
        <div className="container mt-5">
            <h4>Hobbies and Interests</h4>
            {interests.map(int => (
                <div key={int.id} className="mb-3">
                    <InterestSection 
                        interest={int}
                        handleInterestChange={handleInterestChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveInterest(int)}>
                        Delete Hobby
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddInterest}>
                Add Hobby
            </button>
        </div>
    );
}

export default InterestsForm;