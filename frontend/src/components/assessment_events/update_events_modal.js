import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateEventsModal = ({ show, handleClose, handleUpdate, events }) => {
    const [updatedEvents, setupdatedEvents] = useState(null);

    const [titleList, settitleList] = useState([]); // State to hold the list of allassessment_title

    useEffect(() => {
        setupdatedEvents(events); // Set events data on mount or update

         // Fetch allassessment_title
        fetchassessment_title();

    }, [events]);


    const fetchassessment_title = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allassessment_title");

        if (!response.ok) {
        throw new Error('Failed to fetch allassessment_title');
      }

      const result = await response.json();
      console.log('Fetched Data:', result.data);
      // Check if the result is an array before setting allassessment_title
      if (Array.isArray(result.data)) {
        settitleList(result.data); // Update the allassessment_title list
      } else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    catch (error) {
      console.error('Error fetching allassessment_title:', error);
    }
  };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [fieldName, subFieldName] = name.split('.');

        if (subFieldName) {
            // If the field has a subfield (nested object), update it properly
            setupdatedEvents({
                ...updatedEvents,
                [fieldName]: {
                    ...updatedEvents[fieldName],
                    [subFieldName]: value,
                },
            });
        } else {
            // If it's a top-level field, update as before
            setupdatedEvents({ ...updatedEvents, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedEvents);
    };

    if (!updatedEvents) {
        return null; // Return null or handle the case when events data is not available
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Update Events</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
            <Form.Label>select title name</Form.Label>
            <Form.Select
              name="title"
              placeholder="select title name"
              value={updatedEvents.title}
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
              value={updatedEvents.slot.startDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="lateLoginDuration">
            <Form.Label>Late Login Duration</Form.Label>
            <Form.Control
              type="text"
              name="slot.lateLoginDuration"
              value={updatedEvents.slot.lateLoginDuration}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              name="slot.endDate"
              value={updatedEvents.slot.endDate}
              onChange={handleInputChange}
              required
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

export default UpdateEventsModal;
