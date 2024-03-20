import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import "./HomePageBannerStyle.css";

const myPicture = [
  {
    src: "https://res.cloudinary.com/dououppib/image/upload/v1710928246/PLANTS/ff5uvfmzwconwahvivr9.avif",
    label: "Spring is here!!",
    description: "Find someone to take care of your plants while you are on vacation!"
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
            <LabelRight>
              <LabelTitle>{picture.label}</LabelTitle>
              <LabelDescription>{picture.description}</LabelDescription>
            </LabelRight>
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
  top: 0;
  right: 300px; 
  height: 110%; 
  width: 400px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(222, 190, 72, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;

`;

const LabelTitle = styled.h1`
  margin: 0;
  color: white;
  font-size: 1.8em; 
`;

const LabelDescription = styled.p`
  font-size: 1em; 
`;

export default SingleBannerComponent;

