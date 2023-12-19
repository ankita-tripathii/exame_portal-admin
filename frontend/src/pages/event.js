 import React from 'react';
 import DNavbar from "../components/navbar/navbar";
 import FooterExample from "../components/footer/footer";
 import EventsList from "../components/assessment_events/events";
 // import Row from 'react-bootstrap/Row';
 // import Col from 'react-bootstrap/Col';
 import Stack from 'react-bootstrap/Stack';



 const Event = () => {
  return (
     <>
     <Stack gap={2}>
     
     <DNavbar/>
    
     
     <EventsList/>
    
    
     

    </Stack>
    <FooterExample/>
     </>
  	);
}

export default Event;