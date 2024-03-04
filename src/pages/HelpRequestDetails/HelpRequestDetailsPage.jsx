import React, { useState, useEffect } from 'react'
import './HelpRequestDetailsPage.css'
import HelpRequest from '../../componenets/HelpRequest/HelpRequest';
import { useParams } from 'react-router-dom';
import { getOneHelpRequestById } from '../../services/HelpRequests';

const HelpRequestDetailsPage = () => {
    const { requestId } = useParams(); 
    const [helpRequest, setHelpRequest] = useState(null);

    useEffect(() => {
        const fetchHelpRequest = async () => {
            try {
                const data = await getOneHelpRequestById(requestId); 
                setHelpRequest(data);
                console.log("DATA in details page: ", data)
            } catch (error) {
                console.error('Error fetching help request:', error);
                console.log("requestId: ", requestId)
            }
        };
        fetchHelpRequest();
    }, [requestId]); 

    if (!helpRequest) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='main-help-request-details-page-div'>
            {/* <div>
                <h1>{helpRequest.title}</h1>
                <p>{helpRequest.date}</p>
                <p>{helpRequest.message}</p>
                <p>{helpRequest.start_date}</p>
                <p>{helpRequest.end_date}</p>
                <p>{helpRequest.maxprice}</p>
                <p>{helpRequest.user_details.username}</p>
                <p>{helpRequest.user_details.first_name}</p>
                <p>{helpRequest.user_details.last_name}</p>
                <p>{helpRequest.user_details.avatar_url_string}</p>
            </div> */}
                    <HelpRequest
                        key={helpRequest.id}
                        title={helpRequest.title}
                        date={helpRequest.date}
                        message={helpRequest.message}
                        start_date={helpRequest.start_date}
                        end_date={helpRequest.end_date}
                        maxprice={helpRequest.maxprice}
                        username={helpRequest.user_details.username}
                        first_name={helpRequest.user_details.first_name}
                        last_name={helpRequest.user_details.last_name}
                        avatar_url_string={helpRequest.user_details.avatar_url_string}
                    />
            </div>
        </div>
    )
}

export default HelpRequestDetailsPage