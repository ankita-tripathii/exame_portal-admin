import React, { useState, useEffect } from 'react';
//import styles from "./assessment.module.css";
import { Modal, Form, Button } from 'react-bootstrap';

const CreateEventsModal = ({ show, handleClose, handleSubmit }) => {
  const [assessmenteventData, setassessmenteventData] = useState({
    title: '',
    slot: {
      startDate: '',
      lateLoginDuration: '', 
      endDate: '',
    }
  });

  const [titleList, settitleList] = useState([]); // To store the list of organization names
 

 // Fetch organization names when dropdown is clicked
  useEffect(() => {
    
      fetchassessment_title();
    
  },[]);


  const fetchassessment_title = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allassessment_title");

        if (!response.ok) {
        throw new Error('Failed to fetch allassessment_title');
      }

      const result = await response.json();

      // Check if the result is an array before setting titleList
      if (Array.isArray(result.data)) {
        settitleList(result.data); // Update the allassessment_title names list
      } 
      else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    
    catch (error) {
      console.error('Error fetching allassessment_title:', error);
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [fieldName, subFieldName] = name.split('.'); // Split the name to handle nested objects

    if (subFieldName) {
    // If the field has a subfield (nested object), update it properly
    setassessmenteventData({
      ...assessmenteventData,
      [fieldName]: {
        ...assessmenteventData[fieldName],
        [subFieldName]: value,
      },
    });
  } else {
    // If it's a top-level field, update as before
    setassessmenteventData({ ...assessmenteventData, [name]: value });
  }
};



   

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(assessmenteventData); // Passing assessment data to handleCreate
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
         <Form.Group controlId="title">
            <Form.Label>select title name</Form.Label>
            <Form.Select
              name="title"
              placeholder="select title name"
              value={assessmenteventData.title}
              onChange={handleInputChange}
              required
            >  
              {titleList.map((assessment) => (
                <option key={assessment._id} value={assessment.title}>
                  {assessment.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="text"
              name="slot.startDate"
              value={assessmenteventData.slot.startDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="lateLoginDuration">
            <Form.Label>Late Login Duration</Form.Label>
            <Form.Control
              type="text"
              name="slot.lateLoginDuration"
              value={assessmenteventData.slot.lateLoginDuration}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              name="slot.endDate"
              value={assessmenteventData.slot.endDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br/>
          <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Create Event
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEventsModal;
