/**
 *  Component for generating a given form section as a list
 */

function GenerateSections({ Component, title, list, handleItemChange, handleAddItem, handleRemoveItem }) {

    return (
        <div className="container mt-5">
            <h4>{title}</h4>
            {list.map(item => (
                <div key={item.id} className="mb-3">
                    <Component 
                        item={item}
                        handleItemChange={handleItemChange} 
                    />
                    <button className="btn btn-primary" type="button" onClick={() => handleRemoveItem(item)}>
                        Delete {title}
                    </button>
                </div>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleAddItem}>
                Add {title}
            </button>
        </div>
    );
}

export default GenerateSections;