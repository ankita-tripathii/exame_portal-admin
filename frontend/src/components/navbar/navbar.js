  import React from 'react';
  import { useState, useEffect } from 'react';
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
  import Button from 'react-bootstrap/Button';
  import ListGroup from 'react-bootstrap/ListGroup';
  // import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import { PersonCircle} from 'react-bootstrap-icons';
  import { List} from 'react-bootstrap-icons';
  import styles from "./navbar.module.css";
  import { jwtDecode} from 'jwt-decode'; 


const DNavbar = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


useEffect(() => {
    // Retrieve token from local storage
    const authToken = localStorage.getItem('token');

    // Decode the token to get user information
    if (authToken) {
     const decodedToken = jwtDecode(authToken);  // Implement your token decoding logic here
      setUserName(decodedToken.name);
      setUserRole(decodedToken.role);
    }
  }, []);


  return (


      <Navbar className={styles.nbackground} expand="lg" variant="dark" sticky="top">
        <Container>
        <Col lg={1}>
          <Navbar.Brand href="/event">ExamZing</Navbar.Brand>
          </Col>
          <Col lg={8}>
          <Button variant="link" onClick={handleShow}><List size={30} color="white"/></Button>
          </Col>

               <Offcanvas show={show} onHide={handleClose}>
             <Offcanvas.Header closeButton>
               <Offcanvas.Title>ExamZing</Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body>
               <ListGroup variant="flush">
                <ListGroup.Item href="/organisation" action >Organisation</ListGroup.Item>
                <ListGroup.Item href="/assessment" action >Assessment</ListGroup.Item>
                <ListGroup.Item href="candidate" action >Candidate</ListGroup.Item>
              </ListGroup>
             </Offcanvas.Body>
           </Offcanvas>

          <Col lg={2}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
           <div className="text-light ml-2">
              <div>{userName}</div>
              <div className="small">{userRole}</div>
            </div>
            <Nav className="ml-auto">
              <NavDropdown id="basic-nav-dropdown">
              <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Account Setting
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
  );
}


export default DNavbar;


     

    