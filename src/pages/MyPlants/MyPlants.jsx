import React from 'react';
import { useState, useEffect } from 'react';
import PlantCards from '../../components/MyPlants/PlantCards';
import AddPlant from '../../components/MyPlants/AddPlant';
import NavbarComponent from '../../components/Navbar/NavbarComponent';
import Footer from "../../components/Footer/Footer";
import { getUserPlants } from "../../services/userPlants.js"
import "./MyPlants.css"
import { useUser } from '../../context/UserContext.jsx';
import MyPlantsBannerComponent from '../../components/Banner/MyPlantsBanner.jsx';

export const MyPlants = () => {
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userPlants, setUserPlants] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { userData, refreshUserData } = useUser();

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
    }, [user_id, token]); 
    

    return (
        <>
            <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
            <MyPlantsBannerComponent />
                <div className='MyPlantsContainer'>
                {!isLoading && <AddPlant myPlants={userPlants}  refreshPlants={fetchPlants}/>}
                <PlantCards  myPlants={userPlants} refreshPlants={fetchPlants} />
                </div>
            <Footer />
        </>
    );
};

export default MyPlants;
