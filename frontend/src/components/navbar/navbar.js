  import React from 'react';
  import { useState, useEffect } from 'react';
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import { Navbar, Container, Nav, NavDropdown, Alert, Spinner} from 'react-bootstrap';
  import Button from 'react-bootstrap/Button';
  import ListGroup from 'react-bootstrap/ListGroup';
  // import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import { PersonCircle} from 'react-bootstrap-icons';
  import { List} from 'react-bootstrap-icons';
  import styles from "./navbar.module.css";
  import { jwtDecode} from 'jwt-decode'; 
  import { useNavigate } from 'react-router-dom';


const DNavbar = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false); // State for faded background
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userApproved, setUserApproved] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserName(decodedToken.name);
      setUserRole(decodedToken.role);
      setUserApproved(decodedToken.isApproved);

      // Extract expiration time from the token and calculate remaining time
      const tokenExpiration = decodedToken.exp * 1000; // in milliseconds
      const currentTime = Date.now();

      const timeUntilExpiration = tokenExpiration - currentTime;

      if (timeUntilExpiration < 0) {
        // Token has expired
        handleLogout(); // Log the user out
        navigate('/login'); // Redirect to login page
      } else {
        // Set a timeout to handle auto-logout when the token expires
        const timeout = setTimeout(() => {
          handleLogout();
          navigate('/login');
        }, timeUntilExpiration);

        // Set another timeout for automatic logout after 10 seconds
        //7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 604800000 milliseconds
      const logoutTimeout = setTimeout(() => {
        handleLogout();
        navigate('/login');
      }, 1800000);

      

        // Clear the logout timeout when the component unmounts or the token changes
      return () => {
        clearTimeout(timeout);
        clearTimeout(logoutTimeout);
      };
      }
    }
  }, [navigate]);


const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage

    setLoading(true);
    setShowBackdrop(true); // Show the faded background

    setTimeout(() => {
    setLoading(false); // Hide the spinner after navigation
    setShowBackdrop(false);
    navigate('/login'); // Redirect to the login page
     }, 3000);

    setTimeout(() => {
     setShowLogoutAlert(true);
    }, 1000);

  };

  return (

      <>
      {showBackdrop && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
            zIndex: 9998,
          }}
        ></div>
      )}

      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Spinner animation="border" variant="dark" role="status" />
        </div>
      )}
      
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
                 {(userRole === 'admin' && userApproved)  && (
                <ListGroup.Item href="candidate" action >Candidate</ListGroup.Item>
                 )}
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
              <NavDropdown.Item href="#">Account Setting </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>

      {showLogoutAlert && (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
      }}
    >
      <Alert variant="info">
        You have been logged out.
      </Alert>
    </div>
    )}
    </>
  );
}


export default DNavbar;


     

    