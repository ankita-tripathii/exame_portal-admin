import React from "react";
import Stack from 'react-bootstrap/Stack';
import Navbarexample from "../components/navbar/navbar";
import Banner from "../components/banner";
import FooterExample from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <Stack gap={0}>
         <Navbarexample />
         <Banner/>
         <FooterExample/>
      </Stack>
    </>
  )
}
