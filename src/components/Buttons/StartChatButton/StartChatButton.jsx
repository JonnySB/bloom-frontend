import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./StartChatButton.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

const StartChatButton = ({ help_offer_user_id }) => {
    const navigate = useNavigate()

    const handleClick = async () => {
        navigate("/messages", { state: { help_offer_user_id: help_offer_user_id } })
    }

    return (
        <Button variant="warning" size="lg" active className="color-chat btn-fill" onClick={handleClick}>
            <FontAwesomeIcon icon={faCommentDots} />
        </Button>
    );
};

export default StartChatButton;
