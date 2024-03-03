import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import "./MessageComponents.css"
import { getAllMessagesByUserId } from "../../services/messages";
import { getuserInformationById } from "../../services/authentication";

function ChatListComponent({ onChatSelect, defaultChatId }) {
  const [message, setMessages] = useState([])
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getuserInformationById(1); // NEED TO PASS THE USER ID HERE
        setUserDetails(userData)
      } catch (err) {
        console.error('Error fetching userDetails:', err);
      }
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
  }, [defaultChatId]);

  const handleConversationClick = (message) => {
    if (message.id === 'new') {
      // If the user clicks the new chat placeholder, prepare to start a new conversation
      onChatSelect({ recipient_id: defaultChatId, receiver_username: `user${defaultChatId}`, messages: [], sender_id: 1  }); // NEED TO PASS THE USER ID HERE
    } else {
      // For existing conversations, just call onChatSelect normally
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