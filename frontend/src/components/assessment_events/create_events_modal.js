import React, { useState, useEffect } from 'react';
//import styles from "./assessment.module.css";
import { Modal, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { BsCalendar } from 'react-icons/bs';
const moment = require('moment-timezone');




const CreateEventsModal = ({ show, handleClose, handleSubmit }) => {

  const [assessmenteventData, setassessmenteventData] = useState({
    title: '',
    slot: {
      startDate: new Date(), // Initial date value
      lateLoginDuration: '', 
      endDate: new Date(), // Initial date value
      timeZone: '', // Initialize timeZone with the selected value
    },
    org_name:'',
  });

  const [titleList, settitleList] = useState([]); // To store the list of organization names
  const [orgNames, setOrgNames] = useState([]);

 // Fetch organization names when dropdown is clicked
  useEffect(() => {
    
      fetchassessment_title();
      fetchOrganisationNames();
    
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


const fetchOrganisationNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/allorg_name');
      if (!response.ok) {
        throw new Error('Failed to fetch organization names');
      }

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setOrgNames(result.data);
      } else {
        console.error('Fetched data is not an array:', result.data);
      }
    } catch (error) {
      console.error('Error fetching organization names:', error);
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

  const handleTimeChange = (time) => {
    setassessmenteventData({
      ...assessmenteventData,
      slot: {
        ...assessmenteventData.slot,
        startDate: time,
      },
    });
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

const { startDate, endDate, timeZone } = assessmenteventData.slot;

  // Convert the startDate and endDate to the selected time zone
  const convertedStartDate = moment.utc(startDate).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
  const convertedEndDate = moment.utc(endDate).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

   // Update the startDate and endDate in the assessmenteventData state
  const updatedEventData = {
    ...assessmenteventData,
    slot: {
      ...assessmenteventData.slot,
      startDate: convertedStartDate,
      endDate: convertedEndDate,
      // Include other fields if needed
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
            <DatePicker
              selected={assessmenteventData.slot.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Form.Group>
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
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              selected={assessmenteventData.slot.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Form.Group>
          <Form.Group controlId="timeZone">
            <Form.Label>Timezone</Form.Label>
            <Form.Control
              as="select"
              name="slot.timeZone"
              value={assessmenteventData.slot.timeZone}
              onChange={handleInputChange}
            >
              <option value="Asia/Kolkata">India</option>
              <option value="America/New_York">US</option>
              <option value="Asia/Dhaka">Bangladesh</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="org_name">
            <Form.Label>select organisation name</Form.Label>
            <Form.Select
              name="org_name"
              placeholder="select organisation name"
              value={assessmenteventData.org_name}
              onChange={handleInputChange}
              required
            >  
              {orgNames.map((org) => (
                <option key={org._id} value={org.org_name}>
                  {org.org_name}
                </option>
              ))}
            </Form.Select>
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
