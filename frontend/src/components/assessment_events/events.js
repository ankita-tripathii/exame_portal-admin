import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import styles from "./events.module.css";
import React, { useState, useEffect } from 'react';
import TableComponent from './table';
import CreateEventsModal from "./create_events_modal";
import { Pagination } from 'react-bootstrap';
import SearchBar from './searchbar';
import { jwtDecode} from 'jwt-decode'; 

import { saveAs } from 'file-saver';

import { Alert } from "react-bootstrap";

const EventsList = () => {
    const [data, setData] = useState([]);
    const [search_assessment_title, setsearch_assessment_title] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

   const [userRole, setUserRole] = useState('');
    const [userApproved, setUserApproved] = useState('');
     

     useEffect(() => {
        fetchData();
        const authToken = localStorage.getItem('token');
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserRole(decodedToken.role);
      setUserApproved(decodedToken.isApproved);
    }
    }, [currentPage, search_assessment_title]);

    const fetchData = async () => {
        try {
             const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/allevent?page=${currentPage}&limit=5`,{
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
                    search_assessment_title
                }),
                })

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

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
        fetchData(search_assessment_title);
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


  const handleCreate = async (assessmenteventData) => {
  try {

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem('token');
  

    const response = await fetch('http://localhost:5000/api/createassessmentevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken // Add your authentication token here
      },
      body: JSON.stringify(assessmenteventData)
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
                console.error('Failed to create assessmentevent');
                // Handle error scenarios if needed
    }
  } catch (error) {
            setAlertVariant('danger');
            setAlertMessage(error.message);
            setShowAlert(true);  
            setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
            console.error('Error creating assessmentevent:', error);
            // Handle fetch errors or other exceptions
  }
};
   
   const handleExportCsv = (async () => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/csvUpload', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to export CSV');
            }

            const result = await response.json();
            
            console.log(result.message);

               // Trigger file download using the provided URL
             const downloadLink = document.createElement('a');
             downloadLink.href = result.filePath;
             console.log('Server Response:', result.filePath);
             downloadLink.download = 'exportedFile.csv';
             downloadLink.click();
         } catch (error) {
             console.error('Error exporting CSV:', error);
             // Handle errors if needed
         }
           });



    return (
      <>
            <Container>
            <Row className={styles.heading} >
            <Col lg={7}>
            <h1 >Event Data</h1>
            </Col>
            {(userRole === 'admin' && userApproved)  && (
            <Col lg={5} className={styles.heading}>
               <div className="ml-auto">
                    <button className="btn btn-primary mr-2" onClick={handleShowModal} >Create Event</button>{'  '}
                     <button className="btn btn-primary mr-2" onClick={handleExportCsv} >Export CSV</button>
                </div>
            </Col>
          )}
            </Row><br/>
            <Row>
            <SearchBar handleSearch={handleSearch} setsearch_assessment_title={setsearch_assessment_title} />
            </Row><br/>
            <Row>
            <TableComponent data={data} fetchData={fetchData} userRole={userRole} userApproved={userApproved}/>
            </Row>

             <CreateEventsModal
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

export default EventsList;
