import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './modal.scss';

const TicketCancellationModal = ({ forceCancelIsOpen, handleTicketForceCancel, toggle }) => {
    const confirmTicketCancel = () => {
        handleTicketForceCancel();
    }

    return (
        <Modal
            className="cancellation-modal-container"
            isOpen={forceCancelIsOpen}
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>Confirm Force Cancellation </ModalHeader>
            <ModalBody>
                <h4>Are you sure to force cancel this ticket?</h4>
            </ModalBody>
            <ModalFooter>
                <div className="edit-buttons">
                    <button className="cencel" onClick={toggle}>Close</button>
                    <button className="modify" onClick={() => confirmTicketCancel()}>Confirm</button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default TicketCancellationModal;