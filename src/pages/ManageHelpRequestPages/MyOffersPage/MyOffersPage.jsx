import React, { useState, useEffect } from "react";
import "./MyOffersPage.css";
import { getOutgoingHelpOffersByUserId } from '../../../services/helpOffers'
import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import MyOffersTable from "../../../components/MyOffersTable/MyOffersTable";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import Footer from "../../../components/Footer/Footer";

const MyOffersPage = () => {
    const [myOffers, setMyOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        const fetchMyHelpOffers = async () => {
            try {
                // TODO - add dynamic user
                const data = await getOutgoingHelpOffersByUserId(user_id, token);
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
            <NavbarComponent />
            <h1>My Offers</h1>
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
            <Footer />
        </div>
    );
};
export default MyOffersPage;
