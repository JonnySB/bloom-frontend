import React, { useState, useEffect } from "react";
import { Container, Navbar, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import "./MessageComponents.css"
import { getMessagesById } from "../../services/messages";


function MessageContainer({ messageId }) {
    const [singleMessage, setSingleMessage] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const messagesData = await getMessagesById(messageId);
          setSingleMessage(messagesData);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      };

      if (messageId) {
        fetchData();
      }
    }, [messageId]);

    if (!singleMessage) return null;
    return (
            <Container className="message">
                  <Card>
                  <Card.Header >Message from User 04</Card.Header>
                    {singleMessage.map((message, index) => (
                    <Card.Body index={index}>
                      <Card.Text>{message.message}</Card.Text>
                 
                    </Card.Body>
                    ))}
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