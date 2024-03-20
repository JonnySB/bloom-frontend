import Container from 'react-bootstrap/Container';
import UserNavbar from '../../components/EditComponents/UserDetailsComponent.jsx';
import React, { useState, useEffect } from "react";
import { getUserPlants } from "../../services/userPlants.js"
import { getAllRequestsByOneUser } from "../../services/RequestedOffersService.js"
import PlantCards from "../../components/MyPlants/ShowPlantsProfilePage.jsx"
import RequiredOffers from "../../components/MyPlants/ShowOffersRequiredProfilePage.jsx"
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import "./ProfilePageStyle.css"
import Footer from "../../components/Footer/Footer.jsx"
import { useUser } from '../../context/UserContext.jsx';
import { useLocation } from "react-router-dom";

export const Profile = () => {
    const [userPlants, setUserPlants] = useState(null)
    const [userOffers, setUserOffers] = useState(null)
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userData, refreshUserData } = useUser();
    const location = useLocation();
    
    let my_item;
    if (location.state?.item) {
        my_item = location.state.item;
    } else if (location.state?.id) {
        my_item = location.state.id;
    } else {
        my_item = undefined;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUserPlantsData = await getUserPlants(user_id, token)
                setUserPlants(getUserPlantsData)
            } catch (err) {
                console.error('Error fetching userPlants details:', err);
            }
            try {
                const getuserRequestOffers = await getAllRequestsByOneUser(user_id, token)
                setUserOffers(getuserRequestOffers)
            } catch (err) {
                console.error('Error fetching userPlants details:', err);
            }
        }
        fetchData()
    }, [])

    


    return (
        <>
            <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
            <div className="profile-container"> 
                <UserNavbar userDetails={userData} refeshUserData={refreshUserData}/>
                <Container className='Items'>
                    <PlantCards myPlants={userPlants} userDetails={my_item} refeshUserData={refreshUserData}/>
                    <RequiredOffers userOffers={userOffers} userDetails={my_item} />
                </Container>
            </div>
            <Footer />
        </>
    )
}
