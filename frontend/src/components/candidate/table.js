import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { PencilSquare } from 'react-bootstrap-icons';
import styles from "./candidate.module.css";
import UpdateCandidateModal from './update_candidate_modal';
import { Alert } from "react-bootstrap";


const TableComponent = ({ data, fetchData, userRole, userApproved }) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (data) => {
        setSelectedCandidate(data);
        setShowModal(true);
    };

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


 const handleUpdateCandidate = async (updatedCandidate) => {
        try {
            // Perform the update API fetch here using updatedCandidate data
            // Example fetch:
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/updatecandidate/${updatedCandidate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken 
                },
                body: JSON.stringify(updatedCandidate),
            });
             
             const result = await response.json();
            // Handle response based on your requirements
            if (response.ok) {
                setAlertVariant('success');
                setAlertMessage(result.message);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000); // Close success alert after 1 seconds
                fetchData();
                handleCloseModal();
               
            } else {
                setAlertVariant('danger');
                setAlertMessage(result.message);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
                console.error('Failed to update candidate');
                
            }
        } catch (error) {
            setAlertVariant('danger');
            setAlertMessage(error.message);
            setShowAlert(true);  
            setTimeout(() => setShowAlert(false), 3000); // Close success alert after 1 seconds
            console.error(error.message);
            
        }
    };
   
    return (
        <>
        <Container>
         <Row>
        <Table striped bordered hover>
            <thead className={styles.theading} sticky="top">
                <tr>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Organisation Name</th>
                    {(userRole === 'admin' && userApproved) && (
                    <th>Edit</th>
                     )}
                </tr>
            </thead>
            <tbody>
                {data.map((candidate) => (
                            <tr key={candidate._id} >
                                <td>{candidate?.user_name || 'N/A'}</td>
                               <td>{candidate?.user_email || 'N/A'}</td>
                                <td>{candidate?.organisation_id?.org_name || 'N/A'}</td>
                                {(userRole === 'admin' && userApproved) && (
                                <td><PencilSquare onClick={() => handleShowModal(candidate)} /></td>
                                )}
                    </tr>
                ))}
            </tbody>
        </Table>

        <UpdateCandidateModal
                show={showModal}
                handleClose={handleCloseModal}
                handleUpdate={handleUpdateCandidate}
                candidate={selectedCandidate}
               />

              
        </Row>
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
        </Container>

        
        </>
    );
}

export default TableComponent;


