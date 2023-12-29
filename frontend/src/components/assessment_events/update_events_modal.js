import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';

const UpdateEventsModal = ({ show, handleClose, handleUpdate, events }) => {
    const [updatedEvents, setupdatedEvents] = useState(null);

  const [titleList, settitleList] = useState([]); // To store the list of organization names
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [selectedassessment, setselectedassessment] = useState('');

    useEffect(() => {
        setupdatedEvents(events); // Set events data on mount or update

         // Fetch allassessment_title
        fetchassessments();

    }, [events]);


    const fetchassessments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/allassessment`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({searchQuery}),
            });

        if (!response.ok) {
        throw new Error('Failed to fetch assessments');
      }

      const result = await response.json();

      // Check if the result is an array before setting orgList
      if (Array.isArray(result.data)) {
        settitleList(result.data); // Update the organization names list
      } 
      else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    
    catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchassessments();
  };


const handleSelectassessment = (assessment) => {
    setselectedassessment(assessment); // Set the selected assessment

    const selectedassessment = titleList.find((item) => item.title === assessment);

    if (selectedassessment) {
      setupdatedEvents({
        ...updatedEvents,
        title: selectedassessment.title,
      });
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
            <Form.Label></Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-title">
                {selectedassessment || 'Select title name'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <Form.Control
                  type="text"
                  placeholder="Search title name"
                  onChange={handleSearch}
                  value={searchQuery}
                />
                {titleList.map((assessment) => (
                    <Dropdown.Item
                      key={assessment._id}
                      onClick={() => handleSelectassessment(assessment.title)}
                    >
                      {assessment.title}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
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
