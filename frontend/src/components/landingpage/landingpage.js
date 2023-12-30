  import React from 'react';
  import { Navbar, Container, Nav} from 'react-bootstrap';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import styles from "./landingpage.module.css";
  import Button from 'react-bootstrap/Button';
 

// Create a layout page, use react router Outlet ?
const LandingPage = () => {
  return (
    <div>
      <Navbar bg="transparent" expand="lg" variant="dark" fixed="top">
        <Container>
        <Col lg={9}>
          <Navbar.Brand href="/event">ExamZing</Navbar.Brand>
          </Col>

          <Col lg={2}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
               <Nav.Link href="/">About</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
      
       <div className={styles.bgimage}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.headingtext}>Online Examination</h1>
              <p className={styles.paratext}>
                Unlock your potential with knowledge. Transforming education <br/>through online assessments.
                Start your journey here.
              </p>
              <Button variant="light" href="/login">Login</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};


export default LandingPage;


     

    