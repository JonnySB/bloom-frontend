import ChatListComponent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState , useEffect} from "react";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);

  

    const handleChatSelect = (msg) => {
        setSelectedMessageId(msg);
      };

  
      // WILL NEED TO GET THE ID FROM WHO WE ARE SENING THE MESSAGE TO FROM THE OFFERS PAGE HERE INSIDE OF THE DEFAULTCHATID

      
    return (
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} defaultChatId={4} /> 
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} />}
      </Container>
    )
}