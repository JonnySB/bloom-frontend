import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container } from 'react-bootstrap'
import "./MessageComponents.css";
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListComponent({ onChatSelect, senderUserID, userDetails, receiverDetails }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [selectedId, setSelectedId] = useState(null);

  
    useEffect(() => {
      const fetchData = async () => {
        if (userDetails && userDetails.id) {
          try {
            let messagesData = await getAllMessagesByUserId(userDetails.id, token);
            setMessages(messagesData);
            let chatExists = messagesData.some(m => m.recipient_id === senderUserID);
            
            if (senderUserID && !chatExists) {
              const newChatPlaceholder = {
                id: 'new',
                recipient_id: receiverDetails?.id,
                receiver_username: receiverDetails?.username,
                messages: []
              };
              messagesData.unshift(newChatPlaceholder);
            }
    
            setMessages(messagesData);
          } catch (err) {
            console.error('Error fetching messages:', err);
          } finally {
            setLoading(false);
          }
        }
      };
  
      if (userDetails && userDetails.id) {
        fetchData();
      }
    }, [senderUserID, userDetails, receiverDetails]);

    const handleConversationClick = (message) => {
    if (message.id === 'new') {
      onChatSelect({ 
        recipient_id: senderUserID, 
        receiver_username: receiverDetails?.username, 
        messages: [], 
        sender_id: userDetails?.id,
      });
    } else {
      onChatSelect(message);
    }
    setSelectedId(message.id);
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }
 
  return (
    <Container className="side-message">
      <Card>
        <Card.Header>Messages</Card.Header>
        <ListGroup variant="flush">
          {messages.map((message) => (
            <ListGroup.Item   className={selectedId === message.id ? 'selected' : ''} key={message.id} onClick={() => handleConversationClick(message)} >
              {message.receiver_username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );    
}

export default ChatListComponent;
