import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Form, Button } from 'react-bootstrap';
import "./MessageComponents.css";
import { getMessagesById, sendMessage } from "../../services/messages";
import io from "socket.io-client";
const socket = io("http://localhost:5001");

function MessageContainer({ messageManager, userDetails, receiverDetails, newRecipientId, newUserName, myRoomIdentifier }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
  const [roomInfo, setRoomInfo] = useState("");
  const [prevRoomIdentifier, setPrevRoomIdentifier] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (messageManager.id !== 'new') {
          const messagesData = await getMessagesById(messageManager.id, token);
          const normalizedMessages = messagesData.flatMap(dataItem => 
            dataItem.message.map(msgStr => {
              try {
                return JSON.parse(msgStr);
              } catch (error) {
                console.error("Error parsing message:", error, "in string:", msgStr);
                return { message: "Error parsing message", sender: "Unknown" };
              }
            })
          );
          setMessages(normalizedMessages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();
  }, [messageManager, token]);
  
  useEffect(() => {

  if (myRoomIdentifier !== prevRoomIdentifier) {
    if (prevRoomIdentifier) {
      socket.emit('leave', { room: prevRoomIdentifier });
    }
    socket.emit('join', { room: myRoomIdentifier });
    setPrevRoomIdentifier(myRoomIdentifier);
  }

  socket.on('new_messages', (data) => {
    const normalizedData = Array.isArray(data) ? data : [data]; 
    const newMessages = normalizedData.map(msg => 
      typeof msg === 'string' ? JSON.parse(msg) : msg
    );
    setMessages(currentMessages => [...currentMessages, ...newMessages]);
  });

  socket.on('joined_room', (data) => {
    setRoomInfo(data.message); 
  });

  return () => {
     if (myRoomIdentifier) {
    socket.emit('leave', { room: myRoomIdentifier });
  }
    socket.off('new_messages');
    socket.off('joined_room');
  };
}, [myRoomIdentifier, socket]);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessageObj = {
      room: myRoomIdentifier,
      sender: userDetails.username,
      sender_id: parseInt(user_id),
      message: newMessage,
      receiver_id: newRecipientId,
      chatId: messageManager.id !== 'new' ? messageManager.id : undefined,
    };
    try {
      await sendMessage(parseInt(user_id), newRecipientId, newUserName, userDetails.username, newMessage, token, myRoomIdentifier);
      socket.emit('message', newMessageObj);
      const normalizedMessageM = { sender: userDetails?.username, message: newMessage,};
      setMessages(currentMessages => [...currentMessages, normalizedMessageM]);
      setNewMessage(""); 

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderMessage = (msgObj, index) => {

    const isCurrentUserMessage = msgObj.sender === userDetails?.username;
    return (
      <div key={`message-${index}`} className="message-bubble">
        <strong>{isCurrentUserMessage ? "You" : msgObj.sender}:</strong> {msgObj.message}
      </div>
    );
  };
  

  return (
    <Container className="message-container">
      <div className="message">
        <Card className="message-card">
          <Card.Header>{userDetails?.username}'s Messages</Card.Header>
          <Card.Body>
            {messages.length === 0 ? (
              <div className="no-messages-placeholder">No Messages</div>
            ) : (
              messages.map((msg, index) => renderMessage(msg, index)
              ))}
               <div ref={messagesEndRef} />
          </Card.Body>
        </Card>
        <Form onSubmit={handleSendMessage}>
          <div className="input-group mb-3">
            <Form.Control
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input-field"
            />
            <Button variant="primary" type="submit" className="send-button">
              Send
            </Button>
          </div>
        </Form>
      </div>
    </Container>  
  );  
}

export default MessageContainer
