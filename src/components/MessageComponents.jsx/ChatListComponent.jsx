import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container } from 'react-bootstrap'
import "./MessageComponents.css";
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListComponent({ onChatSelect, senderUserID, userDetails, receiverDetails }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
  const [selectedId, setSelectedId] = useState(null);

  
    useEffect(() => {
      const fetchData = async () => {
        // gonna need to refactor a few stuff, in the 3 below senarios 
        // if the receiver id is null then show all chats that the user have opening the lasted chat conversation with the last person. 
        // if there is no messages at all from this user then we will show a a message tab saying you have no message
        // if the user comes from the received offers page then we will start a new message with and show all other messages that the user have 
        if(receiverDetails == null) {
          try {
            let getUserMessages = await getAllMessagesByUserId(user_id, token);
            if (getUserMessages == null)  {
              // need to create a place holder here for no messages
              const placeHolderNoMessages = {
                id : "new",
                recipient_id: "new",
                messages: [],
                receiver_username: "You have no messages",
                sender_username: userDetails?.username,
                sender_id: user_id
              };
              messagesData.unshift(placeHolderNoMessages);
            } else {
              setMessages(getUserMessages);
            }
          } catch(err) {
            console.log("Error fetching user's messages", err);
          }
        } 
        else if (receiverDetails !== null) {
          try{
            let messagesData = await getAllMessagesByUserId(user_id, token);
            setMessages(messagesData);
            let chatExists = messagesData.some(m => m.recipient_id === user_id);
            if (!chatExists) {
              const newChatPlaceholder = {
                id : "new",
                recipient_id: receiverDetails?.id,
                messages: [],
                receiver_username: receiverDetails?.username,
                sender_username: userDetails.username,
                sender_id: user_id
              };
              messagesData.unshift(newChatPlaceholder);
            }
            setMessages(messagesData);
          } catch (err) {
            console.error('Error fetching messages:', err);
          } 
          finally {
            setLoading(false);
          }  
        }
      };
      fetchData();
    }, [ user_id, receiverDetails]);

    const handleConversationClick = (message) => {
    if (message.id === 'new') {
      onChatSelect({ 
        recipient_id: senderUserID, 
        receiver_username: receiverDetails?.username, 
        messages: [], 
        sender_id: user_id,
      });
    } else {
      onChatSelect(message);
    }
    setSelectedId(message.id);
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Container className="side-message">
      <Card>
        <Card.Header>Messages</Card.Header>
        <ListGroup variant="flush">
          {messages.map((message) => (
            <ListGroup.Item   className={selectedId === message.id ? 'selected' : ''} key={message.id} onClick={() => handleConversationClick(message)} >
              {message.receiver_username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );    
}

export default ChatListComponent;
