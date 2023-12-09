  import React from 'react';
  import { useState } from 'react';
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
  import Button from 'react-bootstrap/Button';
  import ListGroup from 'react-bootstrap/ListGroup';
  // import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import { PersonCircle} from 'react-bootstrap-icons';
  import { List} from 'react-bootstrap-icons';
  import styles from "./navbar.module.css";

const DNavbar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (


      <Navbar className={styles.nbackground} expand="lg" variant="dark" sticky="top">
        <Container>
        <Col lg={1}>
          <Navbar.Brand href="/event">ExamZing</Navbar.Brand>
          </Col>
          <Col lg={9}>
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

          <Col lg={1}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <PersonCircle size={30} color="white"/>
            <Nav className="ml-auto">
              <NavDropdown title="Ankita Tripathi" id="basic-nav-dropdown">
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


     

    