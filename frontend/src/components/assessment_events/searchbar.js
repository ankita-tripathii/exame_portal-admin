import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch, setsearch_assessment_title }) => {
    return (
        
        <Form onSubmit={handleSearch} inline>
        <Row>
        <Col lg={11}>   
                <Form.Control
                    controlId="search_assessment_title"
                    type="text"
                    placeholder="Search by Assessment Title"
                    onChange={(e) => setsearch_assessment_title(e.target.value)}/>   
            </Col>
            <Col lg={1}>
            <Button variant="primary" type="submit"> Search</Button>
            </Col>
        </Row>
        </Form>
    );
};

export default SearchBar;
