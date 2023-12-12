import React from "react";
// import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
// import Container from "react-bootstrap/Container";
import styles from "./footer.module.css";
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function FooterExample() {
  return (
    
    <Col>
  	<Card className="text-center">
      <Card.Body className={styles.footerbody} >
        <Card.Title>Get Started</Card.Title>
        <Card.Text className={styles.footertext}>
          The free, fun, and effective way to give Exames!
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
   
  );
}
