import React, { useState, useEffect } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const HelpRequestList = () => {
    const [helpRequests, setHelpRequests] = useState([]);

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
        <div>
            <h2>HelpRequest</h2>
            <ul>
            {helpRequests.map(helpRequest => (
                <li key={helpRequest.id}>
                    <p>{helpRequest.title}</p>
                    <p>{helpRequest.message}</p>
                    <p>{helpRequest.date}</p>
                    <p>{helpRequest.start_date}</p>
                    <p>{helpRequest.end_date}</p>
                    <p>{helpRequest.maxprice}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default HelpRequestList