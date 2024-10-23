/**
 * Publication List Component
 */

import PublicationSection from './PublicationSection.jsx';

function PublicationForm({ publications, handlePublicationChange, handleAddPublication, handleRemovePublication }) {

    return (
        <div className="container mt-5">
            <h4>Publications</h4>
            {publications.map(pub => (
                <div key={pub.id} className="mb-3">
                    <PublicationSection 
                        publication={pub}
                        handlePublicationChange={handlePublicationChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemovePublication(pub)}>
                        Delete Publication
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddPublication}>
                Add Publication
            </button>
        </div>
    );
}

export default PublicationForm;