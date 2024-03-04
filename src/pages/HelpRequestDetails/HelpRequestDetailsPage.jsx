import React, { useState, useEffect } from 'react'
import './HelpRequestDetailsPage.css'
import HelpRequest from '../../componenets/HelpRequest/HelpRequest';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { getHelpRequestWithUserById } from '../../services/HelpRequests';

const HelpRequestDetailsPage = () => {
    const [helpRequestWithUser, setHelpRequestWithUser] = useState(null);
    // const { requestId } = useParams();
    const [requestId, setrequestId] = useState(1);

    useEffect(() => {
        const fetchHelpRequestWithUser = async () => {
            try {
                const data = await getHelpRequestWithUserById(requestId);
                setHelpRequestWithUser(data);
            } catch (error) {
                console.error('Error fetching help request with user:', error);
            }
        };

        fetchHelpRequestWithUser();
    }, [requestId]);

    return (
        <div>
            <div className='main-help-request-details-page-div'>
                {helpRequestWithUser && (
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

                )}
            </div>
        </div>
    )
}

export default HelpRequestDetailsPage