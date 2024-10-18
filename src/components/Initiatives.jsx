import React, { useState } from 'react';
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import sudhaar from '../assets/Initiatives/Sudhaar.jpg';
import gyaan from '../assets/Initiatives/Gyaan.jpg';
import nirmaan from '../assets/Initiatives/Nirmaan.jpg';
import gogreen from '../assets/Initiatives/Go-Green.jpg';
import muskaan from '../assets/Initiatives/Muskaan.jpg';
import '../initiatives.css';
const Initiatives = () => {
  const isMobile = window.innerWidth <= 768;
  const [card, setCard] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.slow
  });

  const InCards = [
    {
      key: uuidv4(),
      content: <img src={sudhaar} alt="Sudhaar Initiative" />,
      link: ""
    },
    {
      key: uuidv4(),
      content: <img src={gyaan} alt="Gyaan Initiative" />,
      link: ""
    },
    {
      key: uuidv4(),
      content: <img src={nirmaan} alt="Nirmaan Initiative" />,
      link: ""
    },
    {
      key: uuidv4(),
      content: <img src={gogreen} alt="Go Green Initiative" />,
      link: ""
    },
    {
      key: uuidv4(),
      content: <img src={muskaan} alt="Muskaan Initiative" />,
      link: ""
    },
  ].map((slide, index) => ({
    ...slide,
    onClick: () => {
      if (index === card.goToSlide) window.open(slide.link);
      setCard({ ...card, goToSlide: index });
    },
  }));

  return (
    <div className="Initiatives">
      <br />
      <br />
      <div className="title">
        <h1><span>OUR</span> INITIATIVES</h1>
      </div>
      <div className="initiative-cards">
        <Carousel
          slides={InCards}
          goToSlide={card.goToSlide}
          offsetRadius={card.offsetRadius}
          showNavigation={card.showNavigation}
          animationConfig={card.config}
        />
      </div>
    </div>
  );
}

export default Initiatives;
