import React from 'react';
import { useState, useEffect } from 'react';
import PlantCards from '../../components/MyPlants/PlantCards';
import AddPlant from '../../components/MyPlants/AddPlant';
import NavbarComponent from '../../components/Navbar/NavbarComponent';
import "./MyPlants.css"

export const MyPlants = () => {
  const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userPlants, setUserPlants] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
    try {
        const getUserPlantsData = await getUserPlants(user_id, token)
        setUserPlants(getUserPlantsData)
    } catch (err) {
        console.error('Error fetching userPlants details:', err);
    } 
}    
fetchData()
}, [])


 return (
   <div>
    <NavbarComponent />
     <div className="my-plants-container">
       <div className="back-to-profile">
         <span><a href="/profile">← Back to Profile Page</a></span>
       </div>
       <h1>My Plants</h1>
       <div className="plant-cards-container">
       <div className="add-plants-button"><AddPlant user_plants={userPlants} /></div>
       <PlantCards />
       </div>
     </div>
   </div>
 );
};

export default MyPlants;