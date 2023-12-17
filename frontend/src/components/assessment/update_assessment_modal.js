import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateAssessmentModal = ({ show, handleClose, handleUpdate, organization }) => {
    const [updatedOrganization, setUpdatedOrganization] = useState(null);

    useEffect(() => {
        setUpdatedOrganization(organization); // Set organization data on mount or update
    }, [organization]);

   const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [fieldName, subFieldName] = name.split('.');

        if (subFieldName) {
            // If the field has a subfield (nested object), update it properly
            setUpdatedOrganization({
                ...updatedOrganization,
                [fieldName]: {
                    ...updatedOrganization[fieldName],
                    [subFieldName]: value,
                },
            });
        } else {
            // If it's a top-level field, update as before
            setUpdatedOrganization({ ...updatedOrganization, [name]: value });
        }
        console.log(updatedOrganization);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedOrganization);
        console.log(handleUpdate);
    };

        if (!updatedOrganization) {
        return null; // Return null or handle the case when organization data is not available
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Update Organization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formOrgName">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter organization name"
                            name="org_name"
                            value={updatedOrganization.org_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter state"
                            name="location.state"
                            value={updatedOrganization.location.state || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                   <Form.Group controlId="formPincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pincode"
                            name="location.pincode"
                            value={updatedOrganization.location.pincode || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="contact.emailId"
                            value={updatedOrganization.contact.emailId || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContactNo">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contact number"
                            name="contact.contactNo"
                            value={updatedOrganization.contact.contactNo || ''}
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

export default UpdateAssessmentModal;
