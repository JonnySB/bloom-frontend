import ChatListComponent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState , useEffect} from "react";
import { getuserInformationById } from "../services/authentication";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userData = await getuserInformationById(1); // WE WILL NEED TO LOAD THE USER DETAILS HERE
          setUserDetails(userData);
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };
      
      fetchUserDetails();
    }, []);
  
    const handleChatSelect = (msg) => {
        setSelectedMessageId(msg);
      };

  
      // WILL NEED TO GET THE ID FROM WHO WE ARE SENING THE MESSAGE TO FROM THE OFFERS PAGE HERE INSIDE OF THE DEFAULTCHATID

      
    return (
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} defaultChatId={4} userDetails={userDetails}/> 
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} userDetails={userDetails} />}
      </Container>
    )
}