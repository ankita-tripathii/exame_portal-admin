import React, { useState, useEffect } from 'react';
//import styles from "./assessment.module.css";
import { Modal, Form, Button } from 'react-bootstrap';

const CreateAssessmentModal = ({ show, handleClose, handleSubmit }) => {
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    duration: '',
    question_count: '',
    org_name: '',
  });

  const [orgList, setOrgList] = useState([]); // To store the list of organization names
 

 // Fetch organization names when dropdown is clicked
  useEffect(() => {
    
      fetchOrganizations();
    
  },[]);


  const fetchOrganizations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allorg_name");

        if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const result = await response.json();

      // Check if the result is an array before setting orgList
      if (Array.isArray(result.data)) {
        setOrgList(result.data); // Update the organization names list
      } 
      else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    
    catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData({ ...assessmentData, [name]: value });
  };

   

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(assessmentData); // Passing assessment data to handleCreate
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title name"
              name="title"
              value={assessmentData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration in minutes"
              name="duration"
              value={assessmentData.duration}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="question_count">
            <Form.Label>Question Count</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question count"
              name="question_count"
              value={assessmentData.question_count}
              onChange={handleInputChange}
              required
            />
            </Form.Group>
          <Form.Group controlId="org_name">
            <Form.Label>select orgaisation name</Form.Label>
            <Form.Select
              name="org_name"
              placeholder="select orgaisation name"
              value={assessmentData.org_name}
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
          <Button variant="primary" type="submit">
            Create Assessment
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAssessmentModal;
