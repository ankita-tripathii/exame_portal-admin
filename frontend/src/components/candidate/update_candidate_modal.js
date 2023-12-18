import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCandidateModal = ({ show, handleClose, handleUpdate, candidate }) => {
    const [updatedCandidate, setUpdatedCandidate] = useState(null);

    const [orgList, setOrgList] = useState([]); // State to hold the list of organizations

    useEffect(() => {
        setUpdatedCandidate(candidate); // Set candidate data on mount or update

         // Fetch organization names
        fetchOrgNames();

    }, [candidate]);


    const fetchOrgNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allorg_name");

        if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const result = await response.json();
      console.log('Fetched Data:', result.data);
      // Check if the result is an array before setting orgList
      if (Array.isArray(result.data)) {
        setOrgList(result.data); // Update the organization names list
      } else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedCandidate({
            ...updatedCandidate,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedCandidate);
    };

    if (!updatedCandidate) {
        return null; // Return null or handle the case when candidate data is not available
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Update Candidate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="user_name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="user_name"
              value={updatedCandidate.user_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
                    <Form.Group controlId="user_email">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="user_email"
              value={updatedCandidate.user_email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="orgName">
            <Form.Label>select orgaisation name</Form.Label>
            <Form.Select
              name="org_name"
              value={updatedCandidate.org_name}
              onChange={handleInputChange}
              required
            >  
              {orgList.map((org) => (
                <option key={org._id} value={org.org_name}>
                  {org.org_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group><br/>
                    <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">Update</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateCandidateModal;
