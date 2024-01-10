import React, { useState, useRef, useEffect  } from 'react';
import DNavbar from "../components/navbar/navbar";
import FooterExample from "../components/footer/footer";
import { PencilSquare } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';

function Myprofile() {

const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') && "https://bootdey.com/img/Content/avatar/avatar6.png");
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadProfileImage(selectedFile);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current.click(); // Trigger file input click on edit icon click
  };

  // Update profileImage when 'profileImage' changes in localStorage
  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const uploadProfileImage = async (selectedFile) => {

    const formData = new FormData();
    formData.append('files', selectedFile);

     try {
    const response = await fetch("http://localhost:5000/api/updateFiles", {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })
      const data = await response.json();
      if (data.message) {
        setProfileImage(data.message);
        localStorage.setItem('profileImage', data.message);
        // Handle success or UI updates here
        console.log('File uploaded:', data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
    <Stack gap={2}>
    <DNavbar/>
    <Container>
      <Row>
        <Col lg={12 }xs={12} sm={9}>
          <Form>
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
          src={profileImage}
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
                <Form.Group as={Row} controlId="mobileNumber">
                  <Form.Label column sm={2}>Mobile number</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="tel" placeholder="Enter mobile number" />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="emailAddress">
                  <Form.Label column sm={2}>E-mail address</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" placeholder="Enter email address" />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="workAddress">
                  <Form.Label column sm={2}>Work address</Form.Label>
                  <Col sm={10}>
                    <Form.Control as="textarea" rows={3} placeholder="Enter work address" />
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
                    <Form.Control type="password" placeholder="Enter current password" />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="newPassword">
                  <Form.Label column sm={2}>New password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Enter new password" />
                  </Col>
                </Form.Group><br/>
                <Form.Group as={Row} controlId="makePublic">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check type="checkbox" label="Make this account public" />
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
    </Container>
    </Stack>
    <FooterExample/>
     </>
  );
}

export default Myprofile;
