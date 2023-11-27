import React from "react";
import Image from 'react-bootstrap/Image';
import bannerHero from "../assets/online-examination.png";

export default function Banner() {
  return <Image src={bannerHero}
          height={600}
  />;
}

