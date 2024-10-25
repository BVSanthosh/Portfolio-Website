/**
 * Language Component
 */

function LanguageForm({ item, handleItemChange }) {

    //event handler for reading the user input
    const handleChange = (e) => {
        const value = e.target.value;
        const updatedLanguage = {
            ...item,
            language: value
        };

        handleItemChange(updatedLanguage);
    };

    return(
        <div className="mb-3">
            <input
                type="text"
                aria-label="Language"
                id={`language-${item.id}`}
                name="language"
                value={item.language}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default LanguageForm;