import React, { useState } from 'react';
import styles from "./organisation.module.css";
import { Modal, Form, Button } from 'react-bootstrap';

const CreateOrganizationModal = ({ show, handleClose, handleSubmit }) => {
  const [orgData, setOrgData] = useState({
    org_name: '',
  location: {
    state: '',
    pincode: '',
  },
  contact: {
    emailId: '',
    contactNo: '',
  },
  isApproved: false
  });

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  const [fieldName, subFieldName] = name.split('.'); // Split the name to handle nested objects

  if (subFieldName) {
    // If the field has a subfield (nested object), update it properly
    setOrgData({
      ...orgData,
      [fieldName]: {
        ...orgData[fieldName],
        [subFieldName]: value,
      },
    });
  } else {
    // If it's a top-level field, update as before
    setOrgData({ ...orgData, [name]: value });
  }
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
              name="location.state"
              value={orgData.location.state}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="location.pincode"
              value={orgData.location.pincode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="emailId">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              name="contact.emailId"
              value={orgData.contact.emailId}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactNo">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contact.contactNo"
              value={orgData.contact.contactNo}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br/>
          <div className="d-flex justify-content-center">
          <Button className={styles.orgbtn} variant="primary" type="submit">
            Create Organization
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrganizationModal;
