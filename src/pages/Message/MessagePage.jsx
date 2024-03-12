import ChatListComponent from "../../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserInformationById } from "../../services/users";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [receiverDetails, setReceiverDetails] = useState(null);
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));

    // help_offer_user_id passed from StartChatButton
    const location = useLocation();
    const help_offer_user_id = location.state?.help_offer_user_id;
   

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userData = await getUserInformationById(user_id);
          setUserDetails(userData);

          if (help_offer_user_id !== undefined) {
            const receiverMessageData = await getUserInformationById(help_offer_user_id);
            setReceiverDetails(receiverMessageData);  
          } 
      
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };
    
      fetchUserDetails();
    }, [user_id, help_offer_user_id]);


    const updateReceiverDetails = async (selectedMessage) => {
      if (!selectedMessage) return;
      try {
          const receiverData = await getUserInformationById(selectedMessage.sender_id);
          setReceiverDetails(receiverData);
      } catch (err) {
          console.error('Error fetching receiver details:', err);
      }
  };

    const handleChatSelect = (msg) => {
        setSelectedMessageId(msg);
        updateReceiverDetails(msg)
    }; 


    return (
      <>
        <NavbarComponent />
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} receiverDetails={receiverDetails} userDetails={userDetails} />
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} userDetails={userDetails}  receiverDetails={receiverDetails} />}
      </Container>
      </>
    )
}