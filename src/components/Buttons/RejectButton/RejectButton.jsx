import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./RejectButton.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

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
        <Button size="lg" className="color-reject btn-fill" active onClick={handleClick}>
            <FontAwesomeIcon icon={faCircleXmark} />
        </Button>
    );
};

export default RejectOffer;

