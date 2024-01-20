import React, { useState, useRef, useEffect  } from 'react';

import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/action/action'; // Create this action file

import DNavbar from "../components/navbar/navbar";
import FooterExample from "../components/footer/footer";
import { PencilSquare } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { jwtDecode} from 'jwt-decode'; 
import { Alert } from "react-bootstrap";

function Myprofile() {

  const dispatch = useDispatch();

  //-----------------------------------------------------------

  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [profileImage, setProfileImage] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    emailId: '',
    password:'',
    role: 'admin', // Set the default role as needed
  });

  const fileInputRef = useRef(null);
  const [userId, setUserId] = useState('');


   useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      
        const decodedToken = jwtDecode(authToken);
        setUserId(decodedToken._id);

        // Fetch user data
      fetchUserData(decodedToken._id)
    }
  }, []);


   const fetchUserData = async (userId) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/getUserById/${userId}`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
        redirect: 'follow',
      });
      const data = await response.json();
      if (response.ok) {
        setUserData({
          name: data.name || '',
          emailId: data.emailId || '',
          password:data.password || '',
          role: data.role || 'admin', // Set the default role as needed
        });
        setProfileImage(data.profileImage || '');

      } else {
        console.error('Failed to fetch user data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

//----------------------------------------------------------------------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadProfileImage(selectedFile);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current.click(); // Trigger file input click on edit icon click
  };


  const uploadProfileImage = async (selectedFile) => {

    const formData = new FormData();
    formData.append('files', selectedFile);

     try {

    const authToken = localStorage.getItem('token');

    const response = await fetch("http://localhost:5000/api/updateFiles", {
      method: 'POST',
      body: formData,
      headers: {
          'auth-token': authToken,
        },
      redirect: 'follow'
    })
      const data = await response.json();
      if (data.message) {
        setProfileImage(data.message);
        updateAccount(userId, { profileImage: data.message });

        console.log('File uploaded:', data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

//---------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      // Call the updateAccount API to update user data
      updateAccount(userId, userData);
    
  };

  const updateAccount = async (userId, data) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/updateAccount/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({
          "name": userData.name,
           "emailId": userData.emailId,
           "role": userData.role,
           "profileImage": profileImage
         }),
      });

      const result = await response.json();

      if (response.ok) {
        setAlertVariant('success');
        setAlertMessage(result.message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Close success alert after 1 seconds

        // Dispatch action to update Redux store with updated user data
        dispatch(updateUserInfo({ name: userData.name, role: userData.role }));

      } else {

        setAlertVariant('danger');
        setAlertMessage(result.message || 'An error occurred');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
      }
    } catch (error) {
     setAlertVariant('danger');
     setAlertMessage(error.message);
     setShowAlert(true);  
     setTimeout(() => setShowAlert(false), 1000); // Close success alert after 1 seconds
    }
  };


  return (
    <>
    <Stack gap={2}>
    <DNavbar/>
    <Container>
      <Row>
        <Col lg={12 }xs={12} sm={9}>
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body className="text-center">
                    <div style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '250px', // Set the width and height as required for the circular image
                        height: '250px',
                        overflow: 'hidden',
                        borderRadius: '10%', // Ensure a circular shape
                      }}>
        <Image
          src={profileImage || "https://bootdey.com/img/Content/avatar/avatar6.png"}
          roundedCircle
          className="profile-avatar"
          alt="User avatar"
          style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire space
                }}
        />
        <PencilSquare
          size={20}
          style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            cursor: 'pointer',
            color: 'black',
          }}
          onClick={handleEditImage}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
              </Card.Body>
            </Card><br/>

            <Card>
              <Card.Header>Contact info</Card.Header>
              <Card.Body>
                <Form.Group as={Row} controlId="name">
                  <Form.Label column sm={2}>Name</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                    type="tel"
                    placeholder="Enter Full Name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange} />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="emailAddress">
                  <Form.Label column sm={2}>E-mail address</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email address"
                    type="email"
                    placeholder="Enter email address"
                    name="emailId"
                    value={userData.emailId}
                    onChange={handleInputChange} />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="role">
                  <Form.Label column sm={2}>Role</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                    as="select"
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}>
                    <option value="admin">Admin</option>
                    <option value="delivery_head">Delivery Head</option>
                    </Form.Control>
            
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card><br/>

            <Card>
              <Card.Header>Security</Card.Header>
              <Card.Body>
                <Form.Group as={Row} controlId="currentPassword">
                  <Form.Label column sm={2}>Current password</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter current password"
                    name="password"
                    value={userData.password} />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="newPassword">
                  <Form.Label column sm={2}>New password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Enter new password" />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }} className="d-flex justify-content-center">
                    <div >
                      <Button type="submit" variant="primary">Submit</Button> {'  '}
                      <Button type="reset">Cancel</Button>
                    </div>
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
          </Form>
        </Col>
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
    </Stack>
    <FooterExample/>
     </>
  );
}

export default Myprofile;
