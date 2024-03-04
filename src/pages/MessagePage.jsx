import ChatListComponent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState , useEffect} from "react";
import { getuserInformationById } from "../services/authentication";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const senderUserID = 4; 

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userData = await getuserInformationById(3); // WE WILL NEED TO LOAD THE USER DETAILS HERE
          setUserDetails(userData);
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };
      
      fetchUserDetails();
    }, []);


    // useEffect(() => {
    //   // This will update the selected message whenever the defaultChatId changes
    //   const defaultChatObject = {
    //     id: defaultChatId,
    //     recipient_id: defaultChatId,
    //     // Add other properties as needed by MessageContainer
    //   };
    //   setSelectedMessageId(defaultChatObject);
    // }, [defaultChatId]);
    

    
    // WILL NEED TO GET THE ID FROM WHO WE ARE SENING THE MESSAGE TO FROM THE OFFERS PAGE HERE INSIDE OF THE DEFAULTCHATID
    const handleChatSelect = (msg) => {
      setSelectedMessageId(msg);
    };
      
    return (
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} senderUserID={senderUserID} userDetails={userDetails}/> 
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} userDetails={userDetails} />}
      </Container>
    )
}