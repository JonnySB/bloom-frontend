import React, { useState, useEffect } from "react";
import { Container, Navbar, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { getMessagesById } from "../../services/messages";
import "./MessageComponents.css"

function MessageContainer({ selectedChat }) {
    console.log(selectedChat)

    const [message, setMessage] = useState([])
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                let messagesData = await getMessagesById(selectedChat);
                setMessage(messagesData);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };
        fetchData();
    }, []);
    console.log(message)

    return (
            <Container className="message">
                  <Card>
                    <Card.Header>Message from User 04</Card.Header>
                    <Card.Body>
                      {/* Replace with actual messages */}
                      <Card.Text>User 04: Hello</Card.Text>
                      <Card.Text>You: Hi there!</Card.Text>
                      {/* End Replace */}
                    </Card.Body>
                  </Card>
                  {/* Message Input */}
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