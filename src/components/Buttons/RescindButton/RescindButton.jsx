import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./RescindButton.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

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
        <Button variant="danger" size="lg" className="color-rescind btn-fill" active onClick={handleClick}>
            <FontAwesomeIcon icon={faCircleXmark} />
        </Button>
    );
};

export default RescindButton;

