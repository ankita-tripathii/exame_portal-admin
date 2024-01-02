import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { PencilSquare } from 'react-bootstrap-icons';
import styles from "./events.module.css";
import UpdateEventsModal from './update_events_modal';
import { Alert } from "react-bootstrap";


const TableComponent = ({ data, fetchData, userRole, userApproved}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (data) => {
        setSelectedEvent(data);
        setShowModal(true);
    };

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


 const handleUpdateEvents = async (updatedEvents) => {
        try {
            // Perform the update API fetch here using updatedEvents data
            // Example fetch:
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/updateassessmentevent/${updatedEvents._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken 
                },
                body: JSON.stringify(updatedEvents),
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
                console.error('Failed to update entevent');
                
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
                    <th>Title</th>
                    <th>start Date</th>
                    <th>lateLogin Duration</th>
                    <th>End Date</th>
                    <th>Organisation Name</th>
                     {(userRole === 'admin' && userApproved) && (
                    <th>Edit</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((events) => (
                            <tr key={events._id} >
                                <td>{events?.event_assessment?.title || 'N/A'}</td>
                                <td>{events.slot?.startDate || 'N/A'}</td>
                                <td>{events.slot?.lateLoginDuration || 'N/A'}</td>
                                <td>{events.slot?.endDate || 'N/A'}</td>
                                <td>{events?.organisation?.org_name || 'N/A'}</td>
                                {(userRole === 'admin' && userApproved) && (
                                <td><PencilSquare onClick={() => handleShowModal(events)} /></td>
                                )}
                    </tr>
                ))}
            </tbody>
        </Table>

        <UpdateEventsModal
                show={showModal}
                handleClose={handleCloseModal}
                handleUpdate={handleUpdateEvents}
                events={selectedEvent}
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


