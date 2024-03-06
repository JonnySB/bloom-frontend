import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { recindHelpOffer } from '../../../services/helpOffers'

// TOTO - update to be recind not reject
const RecindButton = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleClick = async () => {
        const success = await recindHelpOffer(help_offer_id, token);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button variant="danger" size="sm" active onClick={handleClick}>
            Recind Offer
        </Button>
    );
};

export default RecindButton;

