import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateAssessmentModal = ({ show, handleClose, handleUpdate, assessment }) => {
    const [updatedAssessment, setUpdatedAssessment] = useState(null);

    const [orgList, setOrgList] = useState([]); // State to hold the list of organizations

    useEffect(() => {
        setUpdatedAssessment(assessment); // Set assessment data on mount or update

         // Fetch organization names
        fetchOrgNames();

    }, [assessment]);


    const fetchOrgNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allorg_name");

        if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const result = await response.json();
      console.log('Fetched Data:', result);
      // Check if the result is an array before setting orgList
      if (Array.isArray(result)) {
        setOrgList(result); // Update the organization names list
      } else {
        console.error('Fetched data is not an array:', result);
      }
      
    } 
    catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedAssessment({
            ...updatedAssessment,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedAssessment);
    };

    if (!updatedAssessment) {
        return null; // Return null or handle the case when assessment data is not available
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Update Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedAssessment.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
                    <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={updatedAssessment.duration}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="question_count">
            <Form.Label>Question Count</Form.Label>
            <Form.Control
              type="text"
              name="question_count"
              value={updatedAssessment.question_count}
              onChange={handleInputChange}
              required
            />
            </Form.Group>
          <Form.Group controlId="orgName">
            <Form.Label></Form.Label>
            <Form.Select
              name="org_name"
              placeholder="select orgaisation name"
              value={updatedAssessment.org_name}
              onChange={handleInputChange}
              required
            >  
              <option value="">Select Organization</option>
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

export default UpdateAssessmentModal;
