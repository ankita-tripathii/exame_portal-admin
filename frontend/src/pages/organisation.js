 import React from 'react';
 import DNavbar from "../components/navbar/navbar";
 import FooterExample from "../components/footer/footer";
 import OrganisationList from "../components/organisation/organisation";
 // import Row from 'react-bootstrap/Row';
 // import Col from 'react-bootstrap/Col';
 import Stack from 'react-bootstrap/Stack';



 const Organisation = () => {
  return (
     <>
     <Stack gap={2}>
     
     <DNavbar/>
    
     <OrganisationList/>

    
    
     

    </Stack>
    <FooterExample/>
     </>
  	);
}

export default Organisation;