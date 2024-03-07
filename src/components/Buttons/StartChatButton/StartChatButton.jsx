import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from 'react-router-dom';

const StartChatButton = ({ help_offer_user_id }) => {
    const navigate = useNavigate()

    const handleClick = async () => {
        navigate("/messages", { state: { help_offer_user_id: help_offer_user_id } })
    }

    return (
        <Button vaient="sucess" size="sm" active onClick={handleClick}>
            Start Chat
        </Button>
    );
};

export default StartChatButton;
