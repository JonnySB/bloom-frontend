import React, { useState, useEffect } from 'react'
import { getAllHelpRequestsWithUserDetails } from '../../services/HelpRequests'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import './HomePage.css'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import Footer from '../../components/Footer/Footer'
import { useUser } from '../../context/UserContext.jsx';

const Homepage = () => {
    const [helpRequestsWithUsers, setHelpRequestsWithUsers] = useState([]);
    const { userData, refreshUserData } = useUser();


    useEffect(() => {
        const fetchHelpRequestsWithUsers = async () => {
            try {
                const data = await getAllHelpRequestsWithUserDetails();
                const sortedData = data.sort((a, b) => b.id - a.id);
                refreshUserData()
                setHelpRequestsWithUsers(sortedData);
            } catch (error) {
                console.error('Error fetching help requests with users:', error);
            }
        };
        fetchHelpRequestsWithUsers();
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


