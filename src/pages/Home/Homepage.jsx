import React, { useState, useEffect } from 'react'
import { getAllHelpRequests } from '../../services/HelpRequests'
import HelpRequest from '../../componenets/HelpRequest/HelpRequest';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import './HomePage.css'

const Homepage = () => {
    const [helpRequests, setHelpRequests] = useState([]);

    // useEffect here for getting each help request so that i can map through it 

    // useEffect(() => {
    //     const fetchAllHelpRequests = async () => {
    //         try {
    //             const allHelpRequests = await getAllHelpRequests();
    //             console.log("TRY BLOCK: all help requests", allHelpRequests)
    //             setHelpRequests(allHelpRequests);
    //             console.log("my requests", allHelpRequests); 
    //             console.log("set help requests => ", setHelpRequests)
    //         } catch (error) {
    //             console.error("Error", error);
    //             console.log("CATCH BLOCK: error getting requests from help request services")
    //         }
    //     };
    //     fetchAllHelpRequests();
    // }, []);

    useEffect(() => {
        fetch(`${BACKEND_URL}/help_requests`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch help requests')
            }
            return response.json();
        })
        .then(data => {
            setHelpRequests(data);
        })
        .catch(error => {
            console.error('Error fetching help requests: ', error);
        });
    }, []);

    return (
        <div className='main_homepage_div'>
            {/* navbar goes here */}
            <h1>BLOOM</h1>
            <div role='feed'>
                {helpRequests.map((helpRequest) => (
                    <HelpRequest 
                        key={helpRequest.id}
                        user_id={helpRequest.usesr_id}
                        date={helpRequest.date}
                        title={helpRequest.title}
                        message={helpRequest.message}
                        start_date={helpRequest.start_date}
                        end_date={helpRequest.end_date}
                        maxprice={helpRequest.maxprice}
                    />
                ))}
            </div>
        </div>
    )
}

export default Homepage