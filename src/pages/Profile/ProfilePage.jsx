import Container from 'react-bootstrap/Container';
import UserNavbar from '../../components/EditComponents.jsx/UserDetailsComponent';
import React, { useState , useEffect} from "react";
import { getuserInformationById } from '../../services/users';
import PlantsProfilePage from "../../components/MyPlants/ShowPlantsProfilePage.jsx"
import { getUserPlants } from "../../services/userPlants.js"

export const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [userPlants, setUserPlants] = useState(null)
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));

     useEffect(() => {
        const fetchData = async () => {
        try {
            const userData = await getuserInformationById(user_id);
            setUserDetails(userData)
        } catch (err) {
            console.error('Error fetching user details:', err);
        } 
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
        <Container>
            <h1>Welcome to the profile page</h1>
            <UserNavbar userDetails={userDetails}/>
            <PlantsProfilePage userPlants={userPlants}/>
        </Container>
    )
}