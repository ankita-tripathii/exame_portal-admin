import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import { Modal} from 'react-bootstrap';
import styles from "./organisation.module.css";
import React, { useState, useEffect } from 'react';
import TableComponent from './table';
import CreateOrganizationModal from "./create_org_modal";
import SearchBar from './searchbar';
import { Alert } from "react-bootstrap";

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

  const [showModal, setShowModal] = useState(false);// for show modal

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);



  const handleCreate = async (orgData) => {
  try {

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem('token');


    const response = await fetch('http://localhost:5000/api/createorganisation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken // Add your authentication token here
      },
      body: JSON.stringify(orgData)
    });
     
     const result = await response.json();

    if (response.ok) {
      
                setAlertVariant('success');
                setAlertMessage(result.message);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000); // Close success alert after 1 seconds

                fetchData();
                handleCloseModal();
      
    } else {
                setAlertVariant('danger');
                setAlertMessage(result.message || 'An error occurred');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
                console.error('Failed to create organization');
                // Handle error scenarios if needed
    }
  } catch (error) {
            setAlertVariant('danger');
            setAlertMessage('An error occurred');
            setShowAlert(true);  
            setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
            console.error('Error creating organization:', error);
            // Handle fetch errors or other exceptions
  }
};
   
    return (
      <>
            <Container>
            <Row className={styles.heading}>
            <Col lg={8}>
            <h1 >Organisation Data</h1>
            </Col>
            <Col lg={4}>
               <div className="ml-auto">
                    <button className="btn btn-primary mr-2" onClick={handleShowModal}>Create Organisation</button>
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

         {showAlert && (
          <div
            style={{
              position: 'fixed',
              top: '10px',
              right: '100px',
              zIndex: 9999,
            }}
          >
            <Alert variant={alertVariant}>
              {alertMessage}
            </Alert>
          </div>
        )};
        </>
    );
};

export default OrganisationList;
