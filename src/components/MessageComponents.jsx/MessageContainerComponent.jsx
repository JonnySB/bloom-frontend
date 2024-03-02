import React, { useState, useEffect } from "react";
import { Container, Navbar, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import "./MessageComponents.css"
import { getMessagesById, sendMessage } from "../../services/messages";
import io from "socket.io-client";
const socket = io("http://localhost:5001");

function MessageContainer({ messageManager }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
 
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const messagesData = await getMessagesById(messageManager.id);
          setMessages(messagesData);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      };
  
      fetchData();
  
      socket.on('new_messages', (data) => {
        setMessages(data.messages);
      });
      return () => socket.off('new_messages');
    }, [messageManager.id]);
  
    const handleSendMessage = async (e) => {
      e.preventDefault();
      try {
        await sendMessage(messageManager.sender_id, messageManager.recipient_id, newMessage);
        console.log("Message sent successfully");
        socket.emit('data', { message: newMessage, chatId: messageManager.id, sender:messageManager.sender_id, receiver:messageManager.recipient_id });
        setNewMessage(""); // Reset the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };

    return (
            <Container className="message">
                  <Card>
                  <Card.Header >Message from User 04</Card.Header>
                    <Card.Body >
                    {messages.map((message, index) => (
                      <Card.Text key={index}>{message.message}</Card.Text>
                      ))}
                    </Card.Body>
                  </Card>
                  <Form onSubmit={handleSendMessage}>
                    <Form.Group className="mb-3" controlId="messageInput">
                    <Form.Control
                        type="text"
                        placeholder="Write a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                  </Form>
                     
            </Container>
          );
        }

export default MessageContainer;