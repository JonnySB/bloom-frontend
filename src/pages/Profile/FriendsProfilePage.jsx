import Container from 'react-bootstrap/Container';
import UserNavbarFriendsDetails from '../../components/EditComponents.jsx/UserDetailsComponent';
import React, { useState, useEffect } from "react";
import { getUserPlants } from "../../services/userPlants.js"
import { getAllRequestsByOneUser } from "../../services/RequestedOffersService.js"
import PlantCards from "../../components/MyPlants/ShowPlantsProfilePage.jsx"
import RequiredOffers from "../../components/MyPlants/ShowOffersRequiredProfilePage.jsx"
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import "./ProfilePageStyle.css"
import Footer from "../../components/Footer/Footer.jsx"

export const Profile = () => {
    const [userPlants, setUserPlants] = useState(null)
    const [userOffers, setUserOffers] = useState(null)
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userData, refreshUserData } = useUser();
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUserPlantsData = await getUserPlants(2, token)
                setUserPlants(getUserPlantsData)
            } catch (err) {
                console.error('Error fetching userPlants details:', err);
            }
            try {
                const getuserRequestOffers = await getAllRequestsByOneUser(2, token)
                setUserOffers(getuserRequestOffers)
            } catch (err) {
                console.error('Error fetching userPlants details:', err);
            }
        }
        fetchData()
    }, [])

    


    return (
        <>
            <NavbarComponent userDetails={userData}  />
            <div className="profile-container"> 
                <UserNavbarFriendsDetails />
                <Container className='Items'>
                    <PlantCards myPlants={userPlants} refeshUserData={refreshUserData}/>
                    <RequiredOffers userOffers={userOffers} />
                </Container>
            </div>
            <Footer />
        </>
    )
}
