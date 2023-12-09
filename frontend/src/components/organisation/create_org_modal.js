import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateOrganizationModal = ({ show, handleClose, handleSubmit }) => {
  const [orgData, setOrgData] = useState({
    org_name: '',
    state: '',
    pincode: '',
    emailId: '',
    contactNo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData({ ...orgData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(orgData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="orgName">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="org_name"
              value={orgData.org_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={orgData.state}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={orgData.pincode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="emailId">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              name="emailId"
              value={orgData.emailId}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactNo">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNo"
              value={orgData.contactNo}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br/>
          <Button variant="primary" type="submit">
            Create Organization
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrganizationModal;
