import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import styles from "./candidate.module.css";
import React, { useState, useEffect } from 'react';
import TableComponent from './table';
import CreateCandidateModal from "./create_candidate_modal";
import { Pagination } from 'react-bootstrap';
import SearchBar from './searchbar';
import { jwtDecode} from 'jwt-decode'; 

import { Alert } from "react-bootstrap";

const CandidateList = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [userRole, setUserRole] = useState('');
    const [userApproved, setUserApproved] = useState('');
     

     useEffect(() => {
        fetchData();
      const authToken = localStorage.getItem('token');
      if (authToken) {
      const decodedToken = jwtDecode(authToken);  // Implement your token decoding logic here
      setUserRole(decodedToken.role);
      setUserApproved(decodedToken.isApproved);
    }

    }, [currentPage, searchQuery]);

    const fetchData = async (query) => {
        try {

            const authToken = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/allcandidate?page=${currentPage}&pageSize=5`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken // Add your authentication token here
                },
                body: JSON.stringify({ searchQuery: query }),
            });
            const result = await response.json();
            setData(result.data);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

const handleSearch = (e) => {
        e.preventDefault();
         setCurrentPage(1);
        fetchData(searchQuery);
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

//-------------------------------------------------------------------------------------

  const [showModal, setShowModal] = useState(false);// for show modal

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const handleCreate = async (candidateData) => {
  try {

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem('token');
  

    const response = await fetch('http://localhost:5000/api/createcandidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken // Add your authentication token here
      },
      body: JSON.stringify(candidateData)
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
            setAlertMessage(error.message);
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
            <h1 >Candidate Data</h1>
            </Col>
            <Col lg={4}>
               <div className="ml-auto">
                    <button className="btn btn-primary mr-2" onClick={handleShowModal}>Create Candidate</button>
                </div>
            </Col>
          
            </Row><br/>
            <Row>
            <SearchBar handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
            </Row><br/>
            <Row>
            <TableComponent data={data} fetchData={fetchData} userRole={userRole} userApproved={userApproved}/>
            </Row>
            <CreateCandidateModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleCreate}
      />

      {showAlert && (
          <div
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: 9999,
            }}
          >
            <Alert variant={alertVariant}>
              {alertMessage}
            </Alert>
          </div>
        )}
            
      <Col lg={12} className="d-flex justify-content-center">
          <Row className="justify-content-center">
              <Pagination>
                {[...Array(totalPages).keys()].map((page) => (
                  <Pagination.Item key={page + 1} active={currentPage === page + 1} onClick={() => handlePagination(page + 1)}> {page + 1}
                  </Pagination.Item>
                        ))}
               </Pagination>
                </Row>
                </Col>
        </Container>

         
        </>
    );
}

export default CandidateList;
