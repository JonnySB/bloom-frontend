import React from 'react';
import { useState, useEffect } from 'react';
import PlantCards from '../../components/MyPlants/PlantCards';
import AddPlant from '../../components/MyPlants/AddPlant';
import NavbarComponent from '../../components/Navbar/NavbarComponent';
import Footer from "../../components/Footer/Footer";
import { getUserPlants } from "../../services/userPlants.js"
import "./MyPlants.css"

export const MyPlants = () => {
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userPlants, setUserPlants] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const fetchPlants = async () => {
        setIsLoading(true);
        try {
            const getUserPlantsData = await getUserPlants(user_id, token);
            setUserPlants(getUserPlantsData);
        } catch (err) {
            console.error('Error fetching userPlants details:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPlants();
        console.log('Fetching plants...');
    }, [user_id, token]); 
    
  
    return (
        <div>
            <NavbarComponent sticky="top" />
            <div className="my-plants-container">
                <div className="back-to-profile">
                    <span><a href="/profile">← Back to Profile Page</a></span>
                </div>
                <h1>My Plants</h1>
                <div className="plant-cards-container">
                    <div className="add-plants-button">{!isLoading && <AddPlant myPlants={userPlants}  refreshPlants={fetchPlants}/>}</div>
                    <PlantCards  myPlants={userPlants} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyPlants;
