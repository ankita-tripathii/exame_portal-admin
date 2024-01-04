import React, { useState, useEffect } from 'react';
import styles from "./event_candidate.module.css";
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';

const EventCandidateCreateModal = ({ show, handleClose, handleSubmit }) => {

const [eventcandidateData, seteventcandidateData] = useState({
    candidate: '',
    assessmentTitle: '',
  });

  const [candidateList, setcandidateList] = useState([]); // To store the list of candidate names
  const [assessmentTitleList, setassessmentTitleList] = useState([]); // To store the list of event

  const [selectedcandidate, setselectedcandidate] = useState('');
  const [selectedassessmentTitle, setselectedassessmentTitle] = useState('');

  
  const [searchQueryCandidates, setSearchQueryCandidates] = useState('');
  const [searchQueryTitle, setsearchQueryTitle] = useState('');


  // Fetch candidate names and event when dropdown is clicked
  useEffect(() => {
    
      fetchCandidates();
      fetchEvents();
    
  },[searchQueryCandidates, searchQueryTitle]);

  const fetchCandidates = async () => {
   
    try {

      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/allcandidate`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken // Add your authentication token here
                },
                body: JSON.stringify({  searchQuery: searchQueryCandidates }),
            });

        if (!response.ok) {
        throw new Error('Failed to fetch candidate');
      }

      const result = await response.json();

      // Check if the result is an array before setting candidate
      if (Array.isArray(result.data)) {
        setcandidateList(result.data); // Update the candidate names list
      } 
      else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    
    catch (error) {
      console.error('Error fetching candidate:', error);
    }
  };


  const fetchEvents = async () => {
  
  try {

      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/allevent`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken // Add your authentication token here
                },
                body: JSON.stringify({ 
                    filter: { 
                        exam_start_date:null,
                        organisation_name:null 
                    },
                     search_assessment_title: searchQueryTitle,
                }),
            });

        if (!response.ok) {
        throw new Error('Failed to fetch evenyId');
      }

      const result = await response.json();

      // Check if the result is an array before setting evenyId
      if (Array.isArray(result.data)) {
        setassessmentTitleList(result.data); // Update the evenyId list
      } 
      else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    
    catch (error) {
      console.error('Error fetching eventId:', error);
    }

  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seteventcandidateData({ ...eventcandidateData, [name]: value });
  };

   

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(eventcandidateData); // Passing eventcandidate Data to handleCreate
  };

  const handleSelectcandidate = (candidateName) => {
    setselectedcandidate(candidateName);
    seteventcandidateData({ ...eventcandidateData, candidate: candidateName });
  };


  const handleSelecttitle = (assessmenttitle) => {
    setselectedassessmentTitle(assessmenttitle);
    seteventcandidateData({ ...eventcandidateData, assessmentTitle: assessmenttitle });
  };

  const handleSearchCandidates = (e) => {
    setSearchQueryCandidates(e.target.value);
  };

  const handleSearchTitle = (e) => {
    setsearchQueryTitle(e.target.value);
  };


	return(

		<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Event Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
         <Form.Group controlId="candiate">
            <Form.Label>Select Candidate</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-orgs">
                {selectedcandidate || 'Select'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <Form.Control
                  type="text"
                  placeholder="Search candidate name"
                  onChange={handleSearchCandidates}
                  value={searchQueryCandidates}
                />
                {candidateList.map((candidate) => (
                    <Dropdown.Item
                      key={candidate._id}
                      onClick={() => handleSelectcandidate(candidate.user_name)}
                    >
                      {candidate.user_name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group><br/>

          <Form.Group controlId="event">
            <Form.Label>Select assessment setcandidateList</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-orgs">
                {selectedassessmentTitle || 'Select'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <Form.Control
                  type="text"
                  placeholder="Search title"
                  onChange={handleSearchTitle}
                  value={searchQueryTitle}
                />
                {assessmentTitleList.map((event) => (
                    <Dropdown.Item
                      key={event._id}
                      onClick={() => handleSelecttitle(event.event_assessment.title)}
                    >
                      {event.event_assessment.title}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group><br/>
          <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Create Event Candidate
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
		);
}

export default EventCandidateCreateModal;