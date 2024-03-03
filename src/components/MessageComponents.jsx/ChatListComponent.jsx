import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import "./MessageComponents.css"
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListComponent({ onChatSelect, defaultChatId, userDetails }) {
  const [message, setMessages] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let messagesData = await getAllMessagesByUserId(1);
        setMessages(messagesData);
        let chatExists = messagesData.some(m => m.recipient_id === defaultChatId);
        
         // If there's no chat with the default recipient, create a placeholder to start a new chat
         if (defaultChatId && !chatExists) {
          const newChatPlaceholder = {
            id: 'new', 
            recipient_id: defaultChatId,
            receiver_username: `user${defaultChatId}`, 
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
    };
    fetchData();
  }, [defaultChatId, userDetails]);

  const handleConversationClick = (message) => {
    if (message.id === 'new') {
      onChatSelect({ recipient_id: defaultChatId, receiver_username: `user${defaultChatId}`, messages: [], sender_id: 1,  }); // NEED TO PASS THE USER ID HERE
    } else {
      onChatSelect(message);
    }
  };
  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
        <Container className="side-message">
            <Card>
              <Card.Header>Messages</Card.Header>
              <ListGroup variant="flush">
                {message.map((message) => (
                  <ListGroup.Item key={message.id}  onClick={() => handleConversationClick(message)} >
                     {message.receiver_username}
                  </ListGroup.Item>
                ))}
            
              </ListGroup>
            </Card>
      </Container>
      );
      
}

export default ChatListComponent;