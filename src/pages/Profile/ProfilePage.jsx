import Container from 'react-bootstrap/Container';
import UserNavbar from '../../components/EditComponents.jsx/UserDetailsComponent';
import React, { useState, useEffect } from "react";
import { getUserInformationById } from '../../services/users';
import { getUserPlants } from "../../services/userPlants.js"
import { getAllRequestsByOneUser } from "../../services/RequestedOffersService.js"
import PlantCards from "../../components/MyPlants/ShowPlantsProfilePage.jsx"
import RequiredOffers from "../../components/MyPlants/ShowOffersRequiredProfilePage.jsx"
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import "./ProfilePageStyle.css"
import Footer from "../../components/Footer/Footer.jsx"

export const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [userPlants, setUserPlants] = useState(null)
    const [userOffers, setUserOffers] = useState(null)
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));

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

   
    const fetchUserData = async () => {
        try {
            const userData = await getUserInformationById(user_id);
            setUserDetails(userData);
        } catch (err) {
            console.error('Error fetching userPlants details:', err);
        } 
    };
    
    useEffect(() => {
        fetchUserData();
    }, [user_id]); 
    


    return (
        <>
            <NavbarComponent />
            <div className="profile-container"> {/* This div wraps the content and centers it */}
                <UserNavbar userDetails={userDetails} refeshUserData={fetchUserData}/>
                <Container className='Items'>
                    <PlantCards myPlants={userPlants} refeshUserData={fetchUserData}/>
                    <RequiredOffers userOffers={userOffers} />
                </Container>
            </div>
            <Footer />
        </>
    )
}
