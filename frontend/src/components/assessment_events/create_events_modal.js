import React, { useState, useEffect } from 'react';
import styles from "./events.module.css";
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const moment = require('moment-timezone');




const CreateEventsModal = ({ show, handleClose, handleSubmit }) => {


  const [assessmenteventData, setassessmenteventData] = useState({
    title: '',
    slot: {
      startDate: new Date(), // Initial date value
      lateLoginDuration: '', 
      endDate: new Date(), // Initial date value
      timeZone: '', // Initialize timeZone with the selected value
    }
  });

  const [titleList, settitleList] = useState([]); // To store the list of organization names
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [selectedassessment, setselectedassessment] = useState('');

 // Fetch organization names when dropdown is clicked
  useEffect(() => {
    
       fetchassessments();
    
  },[searchQuery]);


  const fetchassessments = async () => {
    try {

      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/allassessment`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken // Add your authentication token here
                },
                body: JSON.stringify({ searchQuery}),
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
  };

  const handleSelectassessment = (assessment) => {
    setselectedassessment(assessment); // Set the selected assessment

    // Find the assessment object based on the title from the titleList
    const selectedassessment = titleList.find((item) => item.title === assessment);

    // If the selected assessment is found, set its title
    if (selectedassessment) {
        setassessmenteventData({
            ...assessmenteventData,
            title: selectedassessment.title,
        });
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

const handleDateChange = (date, name) => {
    setassessmenteventData({
      ...assessmenteventData,
      slot: {
        ...assessmenteventData.slot,
        [name]: date,
      },
    });
  };


  const handleFormSubmit = (e) => {
  e.preventDefault();

  const { startDate, endDate, timeZone } = assessmenteventData.slot;

  // Create a moment object from the provided startDate and endDate in IST
  const istStartDate = moment.tz(startDate, 'Asia/Kolkata');
  const istEndDate = moment.tz(endDate, 'Asia/Kolkata');
  
// Convert IST startDate and endDate to the selected timeZone
  const convertedStartDate = istStartDate.clone().tz(timeZone).toDate();
  const convertedEndDate = istEndDate.clone().tz(timeZone).toDate();


  // Update the startDate and endDate in the assessmenteventData state
  const updatedEventData = {
    ...assessmenteventData,
    slot: {
      ...assessmenteventData.slot,
      startDate: convertedStartDate,
      endDate: convertedEndDate,
    },
  };

  handleSubmit(updatedEventData); // Passing event data to handleCreate
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
         <Form.Group controlId="title">
            <Form.Label>Select Title Name</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-title">
                {selectedassessment || 'Select'}
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
          </Form.Group><br/>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <div className="d-flex align-items-center">
            <DatePicker
              selected={assessmenteventData.slot.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            </div>
          </Form.Group><br/>
          <Form.Group controlId="lateLoginDuration">
            <Form.Label>Late Login Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="add time in a minutes"
              name="slot.lateLoginDuration"
              value={assessmenteventData.slot.lateLoginDuration}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br/>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <div className="d-flex align-items-center">
            <DatePicker
              selected={assessmenteventData.slot.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            </div>
          </Form.Group><br/>
          <Form.Group controlId="timeZone">
            <Form.Label>Timezone</Form.Label>
            <Form.Control
              as="select"
              name="slot.timeZone"
              value={assessmenteventData.slot.timeZone}
              onChange={handleInputChange}
            >
              <option value="Asia/Kolkata">India (UTC+5:30)</option>
              <option value="America/New_York">US (UTC-5:00)</option>
              <option value="Asia/Dhaka">Bangladesh (UTC+6:00)</option>
            </Form.Control>
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
