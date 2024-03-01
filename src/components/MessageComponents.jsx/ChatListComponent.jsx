import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

function ChatListCompoenent() {
  return (
    <Container > 
        <Card style={{ width: '18rem' }}>
        <Card.Header>Messages</Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        </Card>
    </Container>
  );
}

export default ChatListCompoenent;