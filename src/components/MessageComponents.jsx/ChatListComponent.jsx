import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container } from 'react-bootstrap'
import "./MessageComponents.css";

function ChatListComponent({ onChatSelect, userDetails, receiverDetails, allMessages }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (userDetails && allMessages) {
      let needPlaceholder = false;
      let newChatPlaceholder;
      if (receiverDetails) {
        const chatExistsReceipt = allMessages?.some(m => m.recipient_id === receiverDetails.id); // between sender and recipient
        const chatExistSender = allMessages?.some(m => m.sender_id === receiverDetails.id); // between receiver and sender
        needPlaceholder = !chatExistSender && !chatExistsReceipt;
        if (needPlaceholder) {
          newChatPlaceholder = {
            id: "new",
            recipient_id: receiverDetails.id,
            messages: [],
            receiver_username: receiverDetails.username, 
            sender_username: userDetails?.username,
            sender_id: userDetails?.id
          };
        }
      }

      if (needPlaceholder && newChatPlaceholder) {
        setMessages([newChatPlaceholder, ...allMessages]);
      
      } else {
        setMessages(allMessages);
        
      }
    } 
  }, [userDetails, allMessages, receiverDetails, receiverDetails]); 

  
    const handleConversationClick = (message) => {
      onChatSelect(message);
      setSelectedId(message.id);
  };
    // if (loading) {
    //   return <div>Loading...</div>; 
    //   }  

      return (
    <Container className="side-message">
      <Card>
        <Card.Header>Messages</Card.Header>
        <ListGroup variant="flush">
          {messages.map((message) => (
            <ListGroup.Item   className={selectedId === message.id ? 'selected' : ""} key={message.id} onClick={() => handleConversationClick(message)} >
              {message.sender_username == userDetails?.username ? message.receiver_username : message.sender_username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );    
}

export default ChatListComponent;
