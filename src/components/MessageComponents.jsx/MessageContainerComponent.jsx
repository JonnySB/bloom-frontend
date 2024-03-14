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
  const [roomInfo, setRoomInfo] = useState("");

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

  // useEffect(() => {
  //   socket.emit('join', { room: myRoomIdentifier }); 

  //   socket.on('new_messages', (data) => {
  //     console.log("Raw incoming data:", data);
  //     const newMessages = typeof data.messages === 'string' ? [{ message: data.messages }] : data.messages;
  //     console.log("Processed newMessages:", newMessages);
  //     setMessages((currentMessages) => [...currentMessages, ...newMessages]);
  //   });
  
  //   socket.on('joined_room', (data) => {
  //     setRoomInfo(data.message); 
  //   });
  
  //   return () => {
  //     socket.off('new_messages');
  //     socket.off('joined_room');
  //   };
  // }, [myRoomIdentifier]);

 
  // useEffect(() => {
  //   socket.emit('join', { room: myRoomIdentifier }); 

  //   socket.on('new_messages', (data) => {
  //     let normalizedMessages;
  //     if (typeof data.messages === 'string') {
  //       normalizedMessages = [{ message: data.messages }];
  //     } else if (Array.isArray(data.messages)) {
  //       normalizedMessages = data.messages;
  //     } else if (typeof data.messages === 'object') {
  //       normalizedMessages = [data.messages];
  //     } else {
  //       console.error("Unexpected format for 'data.messages'.", data.messages);
  //       normalizedMessages = [];
  //     }
  //     setMessages(currentMessages => [...currentMessages, ...normalizedMessages]);
  //   });
  
  //   socket.on('joined_room', (data) => {
  //     setRoomInfo(data.message); 
  //   });
  
  //   return () => {
  //     socket.off('new_messages');
  //     socket.off('joined_room');
  //   };
  // }, [myRoomIdentifier, socket]);
  
  useEffect(() => {
    socket.emit('join', { room: myRoomIdentifier }); 
  
    socket.on('new_messages', (data) => {
      console.log(data.messages)
      let normalizedMessages;
      if (typeof data.messages === 'string') {
        try {
          const parsed = JSON.parse(data.messages);
          normalizedMessages = [{ message: parsed.message, sender: parsed.sender }];
        } catch (e) {
          console.error("Error parsing message:", e);
          normalizedMessages = [{ message: data.messages, sender: "Unknown" }]; // Handle as plain text if not JSON.
        }
      } else if (Array.isArray(data.messages)) {
        // Handle as array of messages.
        normalizedMessages = data.messages.map(msg => typeof msg === 'string' ? JSON.parse(msg) : { message: msg.message, sender: msg.sender });
      } else {
        // If it's an object, extract the message and sender directly.
        normalizedMessages = [{ message: data.messages.message, sender: data.messages.sender }];
      }
  
      setMessages(currentMessages => [...currentMessages, ...normalizedMessages]);
    });
  
    socket.on('joined_room', (data) => {
      setRoomInfo(data.message); 
    });
  
    return () => {
      socket.off('new_messages');
      socket.off('joined_room');
    };
  }, [myRoomIdentifier, socket]);


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
      let sentMessageDetails;
      if (messageManager.id === 'new') {
        const newChatDetails = await sendMessage(parseInt(user_id), newRecipientId, newUserName, userDetails.username, newMessage, token, myRoomIdentifier);
        newMessageObj.chatId = newChatDetails.id;
        sentMessageDetails = newChatDetails;
      } else {
        await sendMessage(parseInt(user_id), newRecipientId, newUserName, userDetails.username, newMessage, token, myRoomIdentifier);
        sentMessageDetails = newMessageObj;
      }
      socket.emit('message', newMessageObj);
      const normalizedMessageM = { sender: userDetails?.username, message: newMessage,};
      setMessages(currentMessages => [...currentMessages, normalizedMessageM]);
      setNewMessage(""); 

    } catch (error) {
      console.error('Error:', error);
    }
  };



  const renderMessage = (msgObj, index) => {
    // Check if msgObj is a string or an object and extract message and sender accordingly
    let message, sender;
    if (typeof msgObj === 'string') {
      try {
        const parsedMsg = JSON.parse(msgObj);
        message = parsedMsg.message;
        sender = parsedMsg.sender;
      } catch (error) {
        // If parsing fails, it's a new message string
        message = msgObj;
        sender = userDetails.username; // Assuming new messages are always from the current user
      }
    } else {
      message = msgObj.message;
      sender = msgObj.sender;
    }
    console.log(sender)
    const isCurrentUserMessage = sender === userDetails?.username;
    return (
      <div key={index} className="message-bubble">
        <strong>{isCurrentUserMessage ? "You" : sender}:</strong> {message}
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
              messages.map((msg, index) =>
              Array.isArray(msg.message) ? msg.message.map(renderMessage) : renderMessage(msg.message)
            ))}
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
