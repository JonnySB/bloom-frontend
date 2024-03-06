import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { rejectHelpOffer } from '../../../services/helpOffers'

const RejectOffer = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleClick = async () => {
        const success = await rejectHelpOffer(help_offer_id, token);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button vaient="success" size="sm" active onClick={handleClick}>
            Reject Offer
        </Button>
    );
};

export default RejectOffer;

