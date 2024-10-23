/**
 * Language item Component
 */

function LanguageSection({ language, handleLanguageChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedLanguage = {
            ...language,
            language: value
        };

        handleLanguageChange(updatedLanguage);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                id={`language-${language.id}`}
                name="language"
                value={language.language}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default LanguageSection;