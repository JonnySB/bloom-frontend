import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AcceptButton.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

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
        <Button variant="success" size="lg" className="color-accept btn-fill" active onClick={handleClick}>
            <FontAwesomeIcon icon={faCircleCheck} />
        </Button>
    );
};

export default AcceptButton;
