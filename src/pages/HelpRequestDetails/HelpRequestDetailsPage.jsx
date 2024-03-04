import React, { useState, useEffect } from 'react'
import './HelpRequestDetailsPage.css'
import HelpRequest from '../../componenets/HelpRequest/HelpRequest';
import { useParams } from 'react-router-dom';
import { getOneHelpRequestById } from '../../services/HelpRequests';
// import { getHelpRequestWithUserById } from '../../services/HelpRequests';

const HelpRequestDetailsPage = () => {
    const { requestId } = useParams(); // Get the request ID from the URL params
    const [helpRequest, setHelpRequest] = useState(null);

    useEffect(() => {
        const fetchHelpRequest = async () => {
            try {
                const data = await getOneHelpRequestById(requestId); // Fetch the help request by ID
                setHelpRequest(data);
            } catch (error) {
                console.error('Error fetching help request:', error);
            }
        };
        fetchHelpRequest();
    }, [requestId]); // Fetch help request when requestId changes

    if (!helpRequest) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='main-help-request-details-page-div'>
            <div>
                <h1>{helpRequest.title}</h1>
                {/* Render other details of the help request */}
            </div>
                {/* {helpRequestWithUser && (
                    <HelpRequest
                        key={helpRequestWithUser.id}
                        title={helpRequestWithUser.title}
                        date={helpRequestWithUser.date}
                        message={helpRequestWithUser.message}
                        start_date={helpRequestWithUser.start_date}
                        end_date={helpRequestWithUser.end_date}
                        maxprice={helpRequestWithUser.maxprice}
                        username={helpRequestWithUser.username}
                        first_name={helpRequestWithUser.first_name}
                        last_name={helpRequestWithUser.last_name}
                        avatar_url_string={helpRequestWithUser.avatar_url_string}
                    />

                )} */}
            </div>
        </div>
    )
}

export default HelpRequestDetailsPage