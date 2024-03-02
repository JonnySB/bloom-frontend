import ChatListComponent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import Messages from "../components/MessageComponents.jsx/Message";
import React, { useState, useEffect } from "react";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const handleChatSelect = (id) => {
        setSelectedMessageId(id);
      };
     
    return (
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} />
            {selectedMessageId && <MessageContainer messageId={selectedMessageId} />}
      </Container>
    )
}