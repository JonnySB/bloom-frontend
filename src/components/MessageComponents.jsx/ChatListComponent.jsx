import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import "./MessageComponents.css"
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListComponent({ onChatSelect }) {
  const [message, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let messagesData = await getAllMessagesByUserId(1);
                setMessages(messagesData);
            } catch (err) {
                console.error('Error fetching messages:', err);
            } 
        };
        fetchData();
    }, []);
   
    return (
        <Container className="side-message">
            <Card>
              <Card.Header>Messages</Card.Header>
              <ListGroup variant="flush">
                {message.map((message) => (
                  <ListGroup.Item key={message.id}  onClick={() => onChatSelect(message)} >
                    From user {message.sender_id}: {message.message}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
      </Container>
      );
      
}

export default ChatListComponent;