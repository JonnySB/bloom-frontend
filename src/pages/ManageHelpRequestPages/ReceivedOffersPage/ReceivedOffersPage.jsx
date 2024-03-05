import React, { useState, useEffect } from "react";
import "./ReceivedOffersPage.css";

import { getReceivedHelpOffersByUserId } from '../../../services/ReceivedOffersService'

import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import ReceivedOffersTable from "../../../components/ReceivedOffersTable/ReceivedOffersTable";

const ReceivedOffersPage = () => {

    const [receivedOffers, setReceivedOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);
    
    useEffect(() => {
        const fetchReceivedOffers = async () => {
            try {
                const data = await getReceivedHelpOffersByUserId(1);
                setReceivedOffers(data);
            } catch (error) {
                console.error("Error fetching received offers: ", error)
            }
        };
        fetchReceivedOffers();
    }, [triggerReload])
    
    return (
        <div className="page-container">
            <div>
                <ManageHelpRequestsNavBar />
            </div>
            <div>
                {receivedOffers != null && (
                    <ReceivedOffersTable 
                        receivedOffers={receivedOffers}
                        triggerReload={triggerReload}
                        setTriggerReload={setTriggerReload}
                    />
                )}
            </div>
        </div>
    );
};
export default ReceivedOffersPage;
