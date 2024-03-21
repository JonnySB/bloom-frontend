import React, { useState, useEffect } from "react"
import "../ManageHelpRequestPages.css";
import { getOutgoingHelpOffersByUserId } from '../../../services/helpOffers'
import ManageHelpRequestsNavBar from "../../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar"
import MyOffersTable from "../../../components/ManageRequestsTables/MyOffersTable/MyOffersTable.jsx"
import NavbarComponent from "../../../components/Navbar/NavbarComponent"
import Footer from "../../../components/Footer/Footer"
import { useUser } from '../../../context/UserContext.jsx'
import logo from "../../../assets/bloom-logo.png"
import "./MyOffersPageStyle.css"

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
        <>
            <NavbarComponent userDetails={userData} refeshUserData={refreshUserData} />
            <div className="content-container">
                <div className="logo-container">
                    <img alt='logo' style={{ width: 500 }} src={String(logo)} />
                </div>
                <div className="content-width"> 
                <ManageHelpRequestsNavBar requestsActive={false}  receivedOffersActive={false} helpOffersActive={true} />
                </div>
                <div className="tables-div">
                    {myOffers != null && (<MyOffersTable myOffers={myOffers} triggerReload={triggerReload} setTriggerReload={setTriggerReload}/>)}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default MyOffersPage;
