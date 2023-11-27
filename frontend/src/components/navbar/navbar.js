  import React from "react";
  import { Outlet, Link } from "react-router-dom";
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Container from "react-bootstrap/Container";
  import Nav from "react-bootstrap/Nav";
  import Navbar from "react-bootstrap/Navbar";
  import NavDropdown from "react-bootstrap/NavDropdown";
  import styles from "./navbar.module.css";
 

  export default function Navbarexample() {
    return (
      <>
         <Navbar expand="lg" className={styles.bgBodyTertiary} sticky="top" >
        <Col lg={7} className={styles.brandstyle}  >
          <Navbar.Brand href="#" style={{color: 'white'}}>Online Examination</Navbar.Brand>
          </Col>
          <Col lg={4} >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Nav className="me-auto" >
              <Nav.Link  href="/" style={{color: 'white'}}>Home</Nav.Link>
              <Nav.Link href="/adminlogin" style={{color: 'white'}}>Admin Login</Nav.Link>
              <Nav.Link href="/userlogin" style={{color: 'white'}}>User Login</Nav.Link>
            </Nav> 
          </Col>
          </Navbar>   

          <Outlet />
          </>
    );
  }


     

    