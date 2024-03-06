import Container from 'react-bootstrap/Container';
import UserNavbar from '../../components/EditComponents.jsx/UserDetailsComponent';
import React, { useState , useEffect} from "react";
import { getuserInformationById } from '../../services/users';
import AddPlant from "../../components/MyPlants/AddPlant.jsx"


export const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));

     useEffect(() => {
        const fetchData = async () => {
        try {
            const userData = await getuserInformationById(user_id);
            setUserDetails(userData)
        } catch (err) {
            console.error('Error fetching user details:', err);
        }
    }    
    fetchData()
}, [])


return (
        <Container>
            <h1>Welcome to the profile page</h1>
            <UserNavbar userDetails={userDetails}/>
        </Container>
    )
}