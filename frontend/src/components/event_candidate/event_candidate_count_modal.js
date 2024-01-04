import React from 'react';
import styles from "./event_candidate.module.css";
import { Modal, Button } from 'react-bootstrap';


const EventCandidateCountModal = ({ show, handleClose, eventCandidateCount }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Event Candidate Count</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Event Candidate Count: {eventCandidateCount}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventCandidateCountModal;
