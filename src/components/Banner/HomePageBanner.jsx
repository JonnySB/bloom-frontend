import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import "./HomePageBannerStyle.css";

const myPicture = [
  {
    src: "https://res.cloudinary.com/dououppib/image/upload/v1710928246/PLANTS/ff5uvfmzwconwahvivr9.avif",
    label: "Enjoy 30% off on Winter Products",
    description: "Summer Collection has already arrived."
  },
];

function SingleBannerComponent() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setPictures(myPicture);
  }, []);

  return (
    <div className='singleBannerComponent'>
    <CardLayout>
      {pictures.map((picture, index) => (
        <CardTwo key={index} imageSrc={picture.src}>
           <LabelRight>{picture.label}</LabelRight>
        </CardTwo>
      ))}
    </CardLayout>
    </div>
  );
}


const CardLayout = styled.div`
  margin: 0px 0px 1rem;
`;


const CardTwo = styled.div`
  background: ${({ imageSrc }) => `url(${imageSrc})`} center center / cover;
  height: 500px;
  border-radius: 7px;
  position: relative; /* This makes it a positioning context for absolute children */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 20px;
`;

const LabelRight = styled.div`
  position: absolute;
  top: 0px; /* Adjust the value as needed */
  right: 300px; /* Adjust the value as needed */
  height: 110%;
  width: 400px;
  background-color: rgba(222, 190, 72, 0.5); /* Semi-transparent background */
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  /* Add any other styles for your label here */
`;



export default SingleBannerComponent;

