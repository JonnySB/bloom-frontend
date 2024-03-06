import Container from 'react-bootstrap/Container';
import UserNavbar from '../../components/EditComponents.jsx/UserDetailsComponent';
import React, { useState , useEffect} from "react";
import { getuserInformationById } from '../../services/users';

export const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

     useEffect(() => {
        const fetchData = async () => {
        try {
            const userData = await getuserInformationById(1);
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