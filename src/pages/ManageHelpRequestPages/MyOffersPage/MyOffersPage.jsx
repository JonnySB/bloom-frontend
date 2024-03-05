import React, { useState, useEffect } from "react";
import "./MyOffersPage.css";

import { getOutgoingHelpOffersByUserId } from '../../../services/helpOffers'

import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import MyOffersTable from "../../../components/MyOffersTable/MyOffersTable";

const MyOffersPage = () => {

    const [myOffers, setMyOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);

    useEffect(() => {
        const fetchMyHelpOffers = async () => {
            try {
                // TODO - add dynamic user
                const data = await getOutgoingHelpOffersByUserId(1);
                setMyOffers(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching received offers: ", error)
            }
        };
        fetchMyHelpOffers();
    }, [triggerReload])

    return (
        <div className="page-container">
            <div>
                <ManageHelpRequestsNavBar />
            </div>
            <div>
                {myOffers != null && (
                    <MyOffersTable
                        myOffers={myOffers}
                        triggerReload={triggerReload}
                        setTriggerReload={setTriggerReload}
                    />
                )}
            </div>
        </div>
    );
};
export default MyOffersPage;
