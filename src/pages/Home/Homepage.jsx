import React, { useState, useEffect } from 'react'
import { getAllHelpRequestsWithUserDetailsAndPlant } from '../../services/HelpRequests'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import './HomePage.css'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import Footer from '../../components/Footer/Footer'
import { useUser } from '../../context/UserContext.jsx';

const Homepage = () => {
    const [helpRequestsWithUsers, setHelpRequestsWithUsers] = useState([]);
    const { userData, refreshUserData } = useUser();


    useEffect(() => {
        
        const fetchHelpRequestsWithUsersAndPlant = async () => {
            try {
                const data = await getAllHelpRequestsWithUserDetailsAndPlant();
                const sortedData = data.sort((a, b) => b.id - a.id);
                refreshUserData()
                setHelpRequestsWithUsers(sortedData);
            } catch (error) {
                console.error('Error fetching help requests with users:', error);
            }
        };
        fetchHelpRequestsWithUsersAndPlant();
    }, []);


    return (
        <>
            <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
            <HelpRequest  helpRequestsWithUsers={helpRequestsWithUsers}/>
            <Footer />
        </>
    );
}

export default Homepage;


