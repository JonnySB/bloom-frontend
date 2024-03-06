import React from 'react';
import PlantCards from '../../components/MyPlants/PlantCards';
import AddPlant from '../../components/MyPlants/AddPlant'
import "./MyPlants.css"

export const MyPlants = () => {
 return (
   <div>

     <div className="my-plants-container">
       <div className="back-to-profile">
         <span><a href="/profile">← Back to Profile Page</a></span>
       </div>
       <h1>My Plants</h1>
       <div className="plant-cards-container">
       <div className="add-plants-button"><AddPlant user_plants={['1']} /></div>
       <PlantCards />
       </div>
     </div>
   </div>
 );
};

export default MyPlants;