import ChatListComponent from "../../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserInformationById } from "../../services/users";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import { getAllMessagesByUserId } from "../../services/messages";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [receiverDetails, setReceiverDetails] = useState(null);
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // help_offer_user_id passed from StartChatButton
    const location = useLocation();
    const help_offer_user_id = location.state?.help_offer_user_id;

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userData = await getUserInformationById(user_id);
          setUserDetails(userData);
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };

      const fetchMessagesAndDetails = async () => {
        try {
          const allMessages = await getAllMessagesByUserId(user_id, token);
          setMessages(allMessages);

          if (help_offer_user_id) {
            const helpOfferDetails = await getUserInformationById(help_offer_user_id);
            setReceiverDetails(helpOfferDetails);
          }
        } catch (error) {
          console.error("Error fetching messages or user details:", error);
        }
      };

      fetchUserDetails();
      fetchMessagesAndDetails();
    }, [user_id, help_offer_user_id, token]);

    const handleChatSelect = async (selectedMessage) => {
      console.log(selectedMessage)
      // setSelectedMessageId(selectedMessage);
      // const userId = selectedMessage.sender_id === user_id ? selectedMessage.recipient_id : selectedMessage.sender_id;

      // if (!help_offer_user_id || userId !== help_offer_user_id) {
      //   try {
      //     const receiverData = await getUserInformationById(userId);
      //     setReceiverDetails(receiverData);
      //   } catch (err) {
      //     console.error('Error fetching receiver details from selection:', err);
      //   }
      // }
  };
 
    return (
      <>
        <NavbarComponent />
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} messages_={messages} receiverDetails={receiverDetails} userDetails={userDetails} />
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} userDetails={userDetails}  receiverDetails={receiverDetails} />}
      </Container>
      </>
    )
}