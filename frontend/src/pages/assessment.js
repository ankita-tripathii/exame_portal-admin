 import React from 'react';
 import DNavbar from "../components/navbar/navbar";
 import FooterExample from "../components/footer/footer";
 import AssessmentList from "../components/assessment/assessment";
 // import Row from 'react-bootstrap/Row';
 // import Col from 'react-bootstrap/Col';
 import Stack from 'react-bootstrap/Stack';



 const Assessment = () => {
  return (
     <>
     <Stack gap={2}>
     
     <DNavbar/>
    
     
    <AssessmentList/>
    
    
     

    </Stack>
    <FooterExample/>
     </>
  	);
}

export default Assessment;