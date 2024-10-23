/**
 * Awards List Component
 */

import AwardSection from './AwardSection.jsx';

function AwardsForm({ awards, handleAwardChange, handleAddAward, handleRemoveAward }) {

    return (
        <div className="container mt-5">
            <h4>Awards</h4>
            {awards.map(award => (
                <div key={award.id} className="mb-3">
                    <AwardSection 
                        award={award}
                        handleAwardChange={handleAwardChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveAward(award)}>
                        Delete Award
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddAward}>
                Add Award
            </button>
        </div>
    );
}

export default AwardsForm;