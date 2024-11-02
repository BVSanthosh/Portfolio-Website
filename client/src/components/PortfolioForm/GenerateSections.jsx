/**
 *  Component for generating a given form section as a list
 */

import Button from 'react-bootstrap/Button';

function GenerateSections({ Component, title, list, handleItemChange, handleAddItem, handleRemoveItem }) {

    return (
        <>
            <h4>{title}</h4>
            {list.map(item => (
                <div key={item.id} style={{ marginBottom: "1rem" }}>
                    <Component 
                        item={item}
                        handleItemChange={handleItemChange} 
                    />
                    <Button variant="outline-light" type="button" onClick={() => handleRemoveItem(item)}>
                        Delete {title}
                    </Button>
                </div>
            ))}
            <Button variant="outline-light" type="button" onClick={handleAddItem}>
                Add {title}
            </Button>
        </>
    );
}

export default GenerateSections;