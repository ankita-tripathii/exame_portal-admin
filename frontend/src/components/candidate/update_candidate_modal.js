import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown} from 'react-bootstrap';

const UpdateCandidateModal = ({ show, handleClose, handleUpdate, candidate }) => {
    const [updatedCandidate, setUpdatedCandidate] = useState(null);

    const [orgList, setOrgList] = useState([]); // State to hold the list of organizations
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
    const [selectedOrg, setSelectedOrg] = useState('');
 

    useEffect(() => {
        setUpdatedCandidate(candidate); // Set candidate data on mount or update

         // Fetch organization names
        fetchOrganizations();

    }, [candidate]);


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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectOrg = (orgName) => {
    setSelectedOrg(orgName);
    setUpdatedCandidate({ ...updatedCandidate, org_name: orgName });
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
                    <Button variant="primary" type="submit">Update</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateCandidateModal;
