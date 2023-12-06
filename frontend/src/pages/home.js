import React from "react";
import Stack from 'react-bootstrap/Stack';
import FooterExample from "../components/footer/footer";
import LandingPage from "../components/landingpage/landingpage";
export default function Home() {
  return (
    <>
      <Stack gap={0}>
         <LandingPage/>
         <FooterExample/>
      </Stack>
    </>
  )
}
