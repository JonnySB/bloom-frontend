import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListCompoenent() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let messagesData = await getAllMessagesByUserId(2);
                setMessages(messagesData);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };
        fetchData();
    }, []);

    console.log(messages)
    return (
        <Container>
          <Card style={{ width: '20rem' }}>
            <Card.Header>Messages</Card.Header>
            <ListGroup variant="flush">
              {messages.map((message, index) => (
                <ListGroup.Item key={index}> From user {message.sender_id}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Container>
      );
      
}

export default ChatListCompoenent;