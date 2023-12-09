import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import styles from "./organisation.module.css";
import React, { useState, useEffect } from 'react';
import TableComponent from './table';
import CreateOrganizationModal from "./create_org_modal";
import SearchBar from './searchbar';

const OrganisationList = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

     

     useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (query) => {
        try {
            const response = await fetch('http://localhost:5000/api/allorganisation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery: query }),
            });
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

const handleSearch = (e) => {
        e.preventDefault();
        fetchData(searchQuery);
    };
//-------------------------------------------------------------------------------------
const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCreate = async (orgData) => {
  try {
    const response = await fetch('http://localhost:5000/api/createorganisation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'YOUR_AUTH_TOKEN_HERE' // Add your authentication token here
      },
      body: JSON.stringify({
                    org_name: orgData.org_name,
                    state: orgData.location.state,
                    pincode: orgData.location.pincode,
                    emailId: orgData.contact.emailId,
                    contactNo: orgData.contact.contactNo,
                })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Organization created:', result.data);
      handleCloseModal();
      // You might want to update the data in your table after successful creation
      // You can fetch the updated data or update the state based on the response
    } else {
      console.error('Failed to create organization');
      // Handle error scenarios if needed
    }
  } catch (error) {
    console.error('Error creating organization:', error);
    // Handle fetch errors or other exceptions
  }
};
   
    return (
      
            <Container>
            <Row className={styles.heading}>
            <Col lg={8}>
            <h1 >Organisation Data</h1>
            </Col>
            <Col lg={4}>
               <div className="ml-auto">
                    <button className="btn btn-primary mr-2" onClick={handleShowModal}>Create</button>{' '}
                    <button className="btn btn-secondary" >Update</button>
                </div>
            </Col>
            </Row><br/>
            <Row>
            <SearchBar handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
            </Row><br/>
            <Row>
            <TableComponent data={data} />
            </Row>
            <CreateOrganizationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleCreate}
      />
        </Container>
        
    );
};

export default OrganisationList;
