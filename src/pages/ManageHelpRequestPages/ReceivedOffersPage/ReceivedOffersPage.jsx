import React, { useState, useEffect } from "react";
import "./ReceivedOffersPage.css";
import { getReceivedHelpOffersByUserId } from '../../../services/helpOffers'
import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import ReceivedOffersTable from "../../../components/ReceivedOffersTable/ReceivedOffersTable";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import Footer from "../../../components/Footer/Footer";

const ReceivedOffersPage = () => {

    const [receivedOffers, setReceivedOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);

    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        const fetchReceivedHelpOffers = async () => {
            try {
                // TODO - add dynamic user
                const data = await getReceivedHelpOffersByUserId(user_id, token);
                setReceivedOffers(data);
            } catch (error) {
                console.error("Error fetching received offers: ", error)
            }
        };
        fetchReceivedHelpOffers();
    }, [triggerReload])

    return (
        <div className="page-container">
            <NavbarComponent />
            <h1>Received Offers</h1>
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
            <Footer />
        </div>
    );
};
export default ReceivedOffersPage;
