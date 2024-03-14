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

  useEffect(() => {
    socket.emit('join', { room: myRoomIdentifier }); 

    socket.on('new_messages', (data) => {
      const newMessages = typeof data.messages === 'string' ? [{ message: data.messages }] : data.messages;
      setMessages((currentMessages) => [...currentMessages, ...newMessages]);
    });
  
    socket.on('joined_room', (data) => {
      setRoomInfo(data.message); 
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
      const newMessageFormat = { ...sentMessageDetails, message: [JSON.stringify(sentMessageDetails)] };
      setMessages(currentMessages => [...currentMessages, newMessageFormat]);
      setNewMessage(""); 

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderMessage = (msgStr, idx, msgBundleId) => {
    let messageObj; 
    try {
      messageObj = JSON.parse(msgStr);
    } catch (e) {
      console.error('Error parsing message:', e);
      return <div key={`error-${idx}`} className="message-bubble">Invalid message format</div>;
    }
    const isCurrentUserMessage = messageObj.sender === userDetails?.username;
    return (
      <div key={`${msgBundleId}-${idx}`} className="message-bubble">
        <strong>{isCurrentUserMessage ? "You" : messageObj.sender}:</strong> {messageObj.message}
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
              messages.flatMap((msgBundle, bundleIdx) =>
                msgBundle.message.map((msgStr, msgIdx) =>
                  renderMessage(msgStr, msgIdx, msgBundle.id || `new-${bundleIdx}`) 
                )
              )
            )}
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
