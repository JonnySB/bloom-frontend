import Container from 'react-bootstrap/Container';
import UserNavbarFriendsDetails from '../../components/EditComponents/UserDetailsFriendsComponent.jsx';
import React, { useState, useEffect } from "react";
import { getUserPlants } from "../../services/userPlants.js"
import { getAllRequestsByOneUser } from "../../services/RequestedOffersService.js"
import PlantCards from "../../components/MyPlants/ShowPlantsProfilePage.jsx"
import RequiredOffers from "../../components/MyPlants/ShowOffersRequiredProfilePage.jsx"
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import "./ProfilePageStyle.css"
import Footer from "../../components/Footer/Footer.jsx"
import { useLocation } from "react-router-dom";
import { useUser } from '../../context/UserContext.jsx';


export const FriendsProfilePage = () => {
    const [userPlants, setUserPlants] = useState(null)
    const [userOffers, setUserOffers] = useState(null)
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const location = useLocation();
    const item = location.state?.item; 
    const { userData, refreshUserData } = useUser();
   
    console.log(item)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUserPlantsData = await getUserPlants(item.user_id, token)
                setUserPlants(getUserPlantsData)
            } catch (err) {
                console.error('Error fetching userPlants details:', err);
            }
            try {
                const getuserRequestOffers = await getAllRequestsByOneUser(item.user_id, token)
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
            <UserNavbarFriendsDetails userDetails={item}/>
            <div className="profile-container"> 
                <Container className='Items'>
                    <PlantCards myPlants={userPlants} refeshUserData={refreshUserData}/>
                    <RequiredOffers userOffers={userOffers} />
                </Container>
            </div>
            <Footer />
        </>
    )
}


//   