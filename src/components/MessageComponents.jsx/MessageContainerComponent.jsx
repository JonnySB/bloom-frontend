import React, { useState, useEffect } from "react";
import { Container, Navbar, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import "./MessageComponents.css"
import { getMessagesById, sendMessage } from "../../services/messages";
import io from "socket.io-client";

function MessageContainer({ messageManager }) {
    const [singleMessage, setSingleMessage] = useState([])
    const [socketInstance, setSocketInstance] = useState("")
    const [loading, setLoading] = useState("")
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const messagesData = await getMessagesById(messageManager.id);
          setSingleMessage(messagesData);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      };

      if (messageManager) {
        fetchData();
      }
    }, [messageManager]);
    if (!singleMessage) return null;
    return (
            <Container className="message">
                  <Card>
                  <Card.Header >Message from User 04</Card.Header>
                    <Card.Body >
                    {singleMessage.map((message, index) => (
                      <Card.Text key={index}>{message.message}</Card.Text>
                      ))}
                    </Card.Body>
                  </Card>
                  <Form>
                    <Form.Group className="mb-3" controlId="messageInput">
                      <Form.Control type="text" placeholder="Write a message..." />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                  </Form>
                     
            </Container>
          );
        }

export default MessageContainer;