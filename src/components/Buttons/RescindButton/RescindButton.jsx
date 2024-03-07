import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { rescindHelpOffer } from '../../../services/helpOffers'

// TOTO - update to be rescind not reject
const RescindButton = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleClick = async () => {
        const success = await rescindHelpOffer(help_offer_id, token);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button variant="danger" size="sm" active onClick={handleClick}>
            Rescind Offer
        </Button>
    );
};

export default RescindButton;

