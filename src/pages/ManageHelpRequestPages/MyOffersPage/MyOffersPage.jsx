import React, { useState, useEffect } from "react";
import "./MyOffersPage.css";
import { getOutgoingHelpOffersByUserId } from '../../../services/helpOffers'
import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar";
import MyOffersTable from "../../../components/MyOffersTable/MyOffersTable";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import Footer from "../../../components/Footer/Footer";
import { useUser } from '../../../context/UserContext.jsx';
import logo from "../../../assets/Bloom_logo.png";

const MyOffersPage = () => {
    const [myOffers, setMyOffers] = useState(null);
    const [triggerReload, setTriggerReload] = useState(false);
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userData, refreshUserData } = useUser();

    useEffect(() => {
        const fetchMyHelpOffers = async () => {
            try {
                // TODO - add dynamic user
                const data = await getOutgoingHelpOffersByUserId(user_id, token);
                setMyOffers(data);
            } catch (error) {
                console.error("Error fetching received offers: ", error)
            }
        };
        fetchMyHelpOffers();
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
                        receivedOffersActive={false}
                        helpOffersActive={true}
                    />
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
            <Footer />
        </div>
    );
};
export default MyOffersPage;
