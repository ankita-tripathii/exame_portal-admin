import React from "react";
import Stack from 'react-bootstrap/Stack';
import Banner from "../components/banner/banner";
import FooterExample from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <Stack gap={0}>
         <Banner/>
         <FooterExample/>
      </Stack>
    </>
  )
}
