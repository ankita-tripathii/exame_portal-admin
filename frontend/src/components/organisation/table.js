import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { PencilSquare } from 'react-bootstrap-icons';
import styles from "./organisation.module.css";
import UpdateOrganisationModal from './update_org_modal';
import { Alert } from "react-bootstrap";


const TableComponent = ({ data, fetchData, userRole }) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (data) => {
        setSelectedOrg(data);
        setShowModal(true);
    };

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


 const handleUpdateOrganisation = async (updatedOrg) => {
        try {
            // Perform the update API fetch here using updatedOrg data
            // Example fetch:
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/updateorganisation/${updatedOrg._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken 
                },
                body: JSON.stringify(updatedOrg),
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
                console.error('Failed to update organization');
                
            }
        } catch (error) {
            setAlertVariant('danger');
            setAlertMessage(error.message);
            setShowAlert(true);  
            setTimeout(() => setShowAlert(false), 9000); // Close success alert after 1 seconds
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
                    <th>Organisation Name</th>
                    <th>State</th>
                    <th>Pincode</th>
                    <th>Email Id</th>
                    <th>Contact No</th>
                    {userRole === 'admin' ? (
                    <th>Edit</th>
                    ) : null}
                </tr>
            </thead>
            <tbody>
                {data.map((organisation) => (
                            <tr key={organisation._id} >
                                <td>{organisation.org_name}</td>
                               <td>{organisation.location?.state || 'N/A'}</td>
                                <td>{organisation.location?.pincode || 'N/A'}</td>
                                <td>{organisation.contact?.emailId || 'N/A'}</td>
                                <td>{organisation.contact?.contactNo || 'N/A'}</td>
                                {userRole === 'admin' ? (
                                <td><PencilSquare onClick={() => handleShowModal(organisation)} /></td>
                                ) : null}
                    </tr>
                ))}
            </tbody>
        </Table>

              <UpdateOrganisationModal
                show={showModal}
                handleClose={handleCloseModal}
                handleUpdate={handleUpdateOrganisation}
                organisation={selectedOrg}
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


