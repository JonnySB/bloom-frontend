import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { acceptHelpOffer } from '../../../services/helpOffers'

const AcceptButton = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleClick = async () => {
        const success = await acceptHelpOffer(help_offer_id, token);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button vaient="sucess" size="sm" active onClick={handleClick}>
            Accept Offer
        </Button>
    );
};

export default AcceptButton;
