import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch, setSearchQuery }) => {
    return (
        
        <Form onSubmit={handleSearch} inline>
        <Row>
        <Col lg={11}>   
                <Form.Control
                    controlId="searchQuery"
                    type="text"
                    placeholder="Search by User name and Organization Name"
                    onChange={(e) => setSearchQuery(e.target.value)}/>   
            </Col>
            <Col lg={1}>
            <Button variant="primary" type="submit"> Search</Button>
            </Col>
        </Row>
        </Form>
    );
};

export default SearchBar;
