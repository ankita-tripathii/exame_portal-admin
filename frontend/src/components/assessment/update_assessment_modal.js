import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';

const UpdateAssessmentModal = ({ show, handleClose, handleUpdate, assessment }) => {
    const [updatedAssessment, setUpdatedAssessment] = useState(null);

    const [orgList, setOrgList] = useState([]); // State to hold the list of organizations
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');

    useEffect(() => {
        setUpdatedAssessment(assessment); // Set assessment data on mount or update

         // Fetch organization names
        fetchOrganizations();

    }, [assessment]);


    const fetchOrganizations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/allorganisation`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery}),
            });

        if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const result = await response.json();
      console.log('Fetched Data:', result.data);
      // Check if the result is an array before setting orgList
      if (Array.isArray(result.data)) {
        setOrgList(result.data); // Update the organization names list
      } else {
        console.error('Fetched data is not an array:', result.data);
      }
      
    } 
    catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchOrganizations();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedAssessment({
            ...updatedAssessment,
            [name]: value,
        });
    };

    const handleSelectOrg = (orgName) => {
        setSelectedOrg(orgName);
        setUpdatedAssessment({ ...updatedAssessment, org_name: orgName });
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
                        <Form.Label>Organization Name</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-orgs">
                                {selectedOrg || 'Select organization'}
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

export default UpdateAssessmentModal;
