 import React from 'react';
 import DNavbar from "../components/navbar/navbar";
 import FooterExample from "../components/footer/footer";
 import CandidateList from "../components/candidate/candidate";
 // import Row from 'react-bootstrap/Row';
 // import Col from 'react-bootstrap/Col';
 import Stack from 'react-bootstrap/Stack';



 const Candidate = () => {
  return (
     <>
     <Stack gap={2}>
     
     <DNavbar/>
    
     
     <CandidateList/>
    
    
     

    </Stack>
    <FooterExample/>
     </>
  	);
}

export default Candidate;