import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (messageManager.id != 'new') {
          const messagesData = await getMessagesById(messageManager.id, token);
          setMessages(messagesData);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }; 
    fetchData();
  }, [messageManager, userDetails, user_id, receiverDetails]); 

  useEffect(() => {
    socket.emit('join', { room: myRoomIdentifier }); 

    socket.on('new_messages', (data) => {
      // If data.messages is a string, wrap it in an array
      console.log(data)
      const newMessages = typeof data.messages === 'string' ? [{ message: data.messages }] : data.messages;
      setMessages((currentMessages) => [...currentMessages, ...newMessages]);
    });
  
   
    socket.on('joined_room', (data) => {
      console.log(data.message, "YOU HAVE JOINED THE ROOM", data); 
    });
  
    return () => {
      socket.off('new_messages');
      socket.off('joined_room');
    };
  }, [myRoomIdentifier]);


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
      if (messageManager.id === 'new') {
        const newChatDetails = await sendMessage(parseInt(user_id), newRecipientId, newUserName, userDetails.username, newMessage, token, myRoomIdentifier);
        newMessageObj.chatId = newChatDetails.id; 
      } else {
        await sendMessage(parseInt(user_id), newRecipientId, newUserName, userDetails.username, newMessage, token, myRoomIdentifier);
      }
      socket.emit('message', newMessageObj);
      setMessages(currentMessages => [...currentMessages, newMessageObj]);
      setNewMessage(""); 
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const renderMessage = (messageObj, idx) => {
  
  //   try {
  //     const parsedMessage = JSON.parse(messageObj); // Parse the message string into an object
  //     return (
  //       <div key={idx} className="message-bubble">
  //         <strong>{parsedMessage.sender === userDetails?.username ? "You" : parsedMessage.sender}:</strong> {parsedMessage.message}
  //       </div>
  //     );
  //   } catch (e) {
  //     console.error('Error parsing message:', e);
  //     return (
  //       <div key={idx} className="message-bubble">
  //         {messageObj} 
  //       </div>
  //     );
  //   }
  // };
  const renderMessage = (messageObj, idx) => {
    // Directly access message content without JSON.parse
    const messageContent = messageObj.message;
    return (
      <div key={idx} className="message-bubble">
        <strong>{messageContent.sender === userDetails?.username ? "You" : messageContent.sender}:</strong> {messageContent}
      </div>
    );
  };
  return (
    <Container className="message-container">
      <div className="message">
        {messages.length === 0 ? (
          <div className="no-messages-placeholder">
            <Card className="message-card">
              <Card.Header>{userDetails?.username} 's Messages</Card.Header>
              <Card.Body>No Messages</Card.Body>
            </Card>
          </div>
        ) : (
          <Card className="message-card">
            <Card.Header>{userDetails?.username} 's Messages</Card.Header>
            <Card.Body>
              {messages.map((messageObj, index) => renderMessage(messageObj, index)
              )}
            </Card.Body>
          </Card>
        )}
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
// {Array.isArray(messageObj.message) ? messageObj.message.map(renderMessage) : renderMessage(messageObj.message)}