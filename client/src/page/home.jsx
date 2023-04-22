import React from "react";
import { Carousel } from "../components/home/carousel";
import "../css/home/carousel.scss";

export const Home = () => {
  return (
    <div id="home__background">
      <Carousel></Carousel>
    </div>
  );
};
