import React, { useState, useEffect } from 'react';
//import styles from "./assessment.module.css";
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';

const CreateCandidateModal = ({ show, handleClose, handleSubmit }) => {
  const [candidateData, setCandidateData] = useState({
    user_name: '',
    user_email: '',
    org_name: '',
  });

  const [orgList, setOrgList] = useState([]); // To store the list of organization names
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [selectedOrg, setSelectedOrg] = useState('');
 

 // Fetch organization names when dropdown is clicked
  useEffect(() => {
    
      fetchOrganizations();
    
  },[searchQuery]);


   const fetchOrganizations = async () => {
    try {

      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/allorganisation`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken // Add your authentication token here
                },
                body: JSON.stringify({ searchQuery}),
            });

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
    setCandidateData({ ...candidateData, [name]: value });
  };

   

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(candidateData); // Passing assessment data to handleCreate
  };

  const handleSelectOrg = (orgName) => {
    setSelectedOrg(orgName);
    setCandidateData({ ...candidateData, org_name: orgName });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="user_name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User name"
              name="user_name"
              value={candidateData.user_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="user_email">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter emailid"
              name="user_email"
              value={candidateData.user_email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
           <Form.Group controlId="org_name">
            <Form.Label>Select Organization</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-orgs">
                {selectedOrg || 'Select'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <Form.Control
                  type="text"
                  placeholder="Search organization name"
                  onChange={handleSearch}
                  value={searchQuery}
                />
                {orgList.map((org) => (
                    <Dropdown.Item
                      key={org._id}
                      onClick={() => handleSelectOrg(org.org_name)}
                    >
                      {org.org_name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group><br/>
          <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Create Candidate
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCandidateModal;
