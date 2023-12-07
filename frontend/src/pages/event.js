 import React from 'react';
 import DNavbar from "../components/navbar/navbar";
 import LeftList from "../components/list/list";
 import FooterExample from "../components/footer/footer";
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Stack from 'react-bootstrap/Stack';



 const Event = () => {
  return (
     <>
     <Stack gap={2}>
     
     <DNavbar/>
    
     

    
     
     <LeftList/>

    
     

    </Stack>
    <FooterExample/>
     </>
  	);
}

export default Event;