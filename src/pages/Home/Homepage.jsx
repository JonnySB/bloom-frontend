import React, { useState, useEffect } from 'react'
import { getAllHelpRequestsWithUserDetails } from '../../services/HelpRequests'
import HelpRequest from '../../componenets/HelpRequest/HelpRequest';
import './HomePage.css'


const Homepage = () => {
    const [helpRequestsWithUsers, setHelpRequestsWithUsers] = useState([]);


    useEffect(() => {
        const fetchHelpRequestsWithUsers = async () => {
            try {
                const data = await getAllHelpRequestsWithUserDetails();
                setHelpRequestsWithUsers(data);
            } catch (error) {
                console.error('Error fetching help requests with users:', error);
            }
        };
        fetchHelpRequestsWithUsers();
    }, []); 

    return (
        <div className='main_homepage_div'>
            <h1 className='homepage-title'>BLOOM</h1>
            <div>
                <div role='feed'>
                    {helpRequestsWithUsers.map(helpRequest => (
                        <HelpRequest
                            key={helpRequest.id}
                            id={helpRequest.id}
                            title={helpRequest.title}
                            date={helpRequest.date}
                            first_name={helpRequest.first_name}
                            last_name={helpRequest.last_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
