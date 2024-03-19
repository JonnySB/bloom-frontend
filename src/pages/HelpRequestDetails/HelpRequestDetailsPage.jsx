import React, { useState, useEffect } from 'react'
import './HelpRequestDetailsPage.css'
import HelpRequest from '../../components/HelpRequest/HelpRequest';
import { useParams } from 'react-router-dom';
import { getOneHelpRequestById } from '../../services/HelpRequests';
import CreateOfferForm from '../../components/CreateOfferForm/CreateOfferForm';
import NavbarComponent from '../../components/Navbar/NavbarComponent';
import Footer from '../../components/Footer/Footer';
import { useUser } from '../../context/UserContext.jsx';

const HelpRequestDetailsPage = () => {
    const { requestId } = useParams(); 
    const [helpRequest, setHelpRequest] = useState(null);
    const { userData, refreshUserData } = useUser();

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
        <>
          <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
        <div className='details-page-container'>
            <div className='details-page-content'>
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
                    plant_photo={helpRequest.plant_photo}
                    showButtonView={false}
                />
                <CreateOfferForm id={requestId} />
            </div>
        </div>
        <Footer />
    </>
    )
}

export default HelpRequestDetailsPage