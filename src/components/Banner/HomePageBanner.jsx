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
        <CardTwo key={index}>
           <Card.Title className="custom-card-title">{picture.label}</Card.Title>
           <Card.Text className="custom-card-text">
            {picture.description}
            </Card.Text>
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
  background: url(https://res.cloudinary.com/dououppib/image/upload/v1710928246/PLANTS/ff5uvfmzwconwahvivr9.avif) center center / cover;
  height: 500px;
  border-radius: 7px;
  display: flex;
  flex-direction: column; /* This ensures children are stacked vertically */
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 20px; /* Adds some padding around the content */
`;

export default SingleBannerComponent;


//background-color: rgb(222 190 72 / var(--tw-bg-opacity));