import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { PencilSquare } from 'react-bootstrap-icons';
import styles from "./assessment.module.css";
import UpdateAssessmentModal from './update_assessment_modal';
import { Alert } from "react-bootstrap";


const TableComponent = ({ data, fetchData}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (data) => {
        setSelectedAssessment(data);
        setShowModal(true);
    };

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


 const handleUpdateAssessment = async (updatedAssessment) => {
        try {
            // Perform the update API fetch here using updatedAssessment data
            // Example fetch:
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/updateorganisation/${updatedAssessment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken 
                },
                body: JSON.stringify(updatedAssessment),
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
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Question Count</th>
                    <th>Organisation Name</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {data.map((assessment) => (
                            <tr key={assessment._id} >
                                <td>{assessment?.title || 'N/A'}</td>
                               <td>{assessment?.duration || 'N/A'}</td>
                                <td>{assessment?.question_count || 'N/A'}</td>
                                <td>{assessment?.organisation_id?.org_name || 'N/A'}</td>
                                <td><PencilSquare onClick={() => handleShowModal(assessment)} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <UpdateAssessmentModal
                show={showModal}
                handleClose={handleCloseModal}
                handleUpdate={handleUpdateAssessment}
                assessment={selectedAssessment}
               />

              
        </Row>
        
        </Container>

        
        </>
    );
}

export default TableComponent;


