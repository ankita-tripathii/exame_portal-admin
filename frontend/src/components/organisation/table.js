import React from 'react';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from "react-bootstrap/Container";
import styles from "./organisation.module.css";

const TableComponent = ({ data }) => {
   
    return (
        <Container>
         <Row>
        <Table striped bordered hover>
            <thead className={styles.theading} sticky="top">
                <tr>
                    <th>Organisation Name</th>
                    <th>State</th>
                    <th>Pincode</th>
                    <th>Email Id</th>
                    <th>Contact No</th>
                </tr>
            </thead>
            <tbody>
                {data.map((organisation) => (
                            <tr key={organisation._id} >
                                <td>{organisation.org_name}</td>
                               <td>{organisation.location?.state || 'N/A'}</td>
                                <td>{organisation.location?.pincode || 'N/A'}</td>
                                <td>{organisation.contact?.emailId || 'N/A'}</td>
                                <td>{organisation.contact?.contactNo || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Row>
        </Container>
    );
}

export default TableComponent;


