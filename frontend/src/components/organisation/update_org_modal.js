import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateOrganisationModal = ({ show, handleClose, handleUpdate, organisation }) => {
    const [updatedOrganisation, setUpdatedOrganisation] = useState(null);

    useEffect(() => {
        setUpdatedOrganisation(organisation); // Set organization data on mount or update
    }, [organisation]);

   const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [fieldName, subFieldName] = name.split('.');

        if (subFieldName) {
            // If the field has a subfield (nested object), update it properly
            setUpdatedOrganisation({
                ...updatedOrganisation,
                [fieldName]: {
                    ...updatedOrganisation[fieldName],
                    [subFieldName]: value,
                },
            });
        } else {
            // If it's a top-level field, update as before
            setUpdatedOrganisation({ ...updatedOrganisation, [name]: value });
        }
        console.log(updatedOrganisation);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedOrganisation);
        console.log(handleUpdate);
    };

        if (!updatedOrganisation) {
        return null; // Return null or handle the case when organisation data is not available
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Update Organisation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formOrgName">
                        <Form.Label>Organisation Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter organisation name"
                            name="org_name"
                            value={updatedOrganisation.org_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter state"
                            name="location.state"
                            value={updatedOrganisation.location.state || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                   <Form.Group controlId="formPincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pincode"
                            name="location.pincode"
                            value={updatedOrganisation.location.pincode || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="contact.emailId"
                            value={updatedOrganisation.contact.emailId || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContactNo">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contact number"
                            name="contact.contactNo"
                            value={updatedOrganisation.contact.contactNo || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group><br/>
                    <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">Update</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateOrganisationModal;
