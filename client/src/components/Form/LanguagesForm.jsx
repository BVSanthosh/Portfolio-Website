/**
 * Language List Component
 */

import LanguageSection from './LanguageSection.jsx';

function LanguagesForm({ languages, handleLanguageChange, handleAddLanguage, handleRemoveLanguage }) {

    return (
        <div className="container mt-5">
            <h4>Languages</h4>
            {languages.map(lang => (
                <div key={lang.id} className="mb-3">
                    <LanguageSection 
                        language={lang}
                        handleLanguageChange={handleLanguageChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveLanguage(lang)}>
                        Delete Language
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddLanguage}>
                Add Language
            </button>
        </div>
    );
}

export default LanguagesForm;