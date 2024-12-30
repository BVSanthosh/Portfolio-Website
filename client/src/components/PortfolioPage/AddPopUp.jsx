
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ModalTitle from 'react-bootstrap/esm/ModalTitle';
import Modal from 'react-bootstrap/Modal';

function AddPopUp({ ComponentAdd, title, item, handleItemChange, show, toggle, save }) {
    
    return (
        <Modal show={show} onHide={toggle} animation={false} centered>
            <div className="bg-dark text-light rounded">
                <ModalHeader closeButton>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <Modal.Body scrollable>
                    <ComponentAdd item={item} handleItemChange={handleItemChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="outline-light" onClick={save}>Save Changes</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default AddPopUp;