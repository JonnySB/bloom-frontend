import React, { useState, useEffect } from "react";
import "../ManageHelpRequestPages.css";
import { getReceivedHelpOffersByUserId } from '../../../services/helpOffers'
import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import ReceivedOffersTable from "../../../components/ManageRequestsTables/ReceivedOffersTable/ReceivedOffersTable.jsx";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import Footer from "../../../components/Footer/Footer";
import { useUser } from '../../../context/UserContext.jsx';
import logo from "../../../assets/bloom-logo.png";

const ReceivedOffersPage = () => {
    const [receivedOffers, setReceivedOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);
    const { userData, refreshUserData } = useUser();
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
            <NavbarComponent userDetails={userData} refeshUserData={refreshUserData} />
            <div className="content-container">
                <div className="logo-container">
                    <img alt='logo' style={{ width: 500 }} src={String(logo)} />
                </div>
                <div className="content-width">
                    <ManageHelpRequestsNavBar
                        requestsActive={false}
                        receivedOffersActive={true}
                        helpOffersActive={false}
                    />
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
            </div>
            <Footer />
        </div>
    );
};
export default ReceivedOffersPage;
