import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container } from 'react-bootstrap'
import "./MessageComponents.css";
import { getAllMessagesByUserId } from "../../services/messages";

function ChatListComponent({ onChatSelect, userDetails, receiverDetails, helpOferUserId }) {
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
          
          // this is to create a new chat
          if (userDetails) {
            if (helpOferUserId == undefined && receiverDetails) {
              try {  
                let getUserMessages = await getAllMessagesByUserId(user_id, token);
                let chatExistsReceipt = getUserMessages.some(m => m.recipient_id == receiverDetails.id); // between sender and receipt 
                let chatExistSender = getUserMessages.some(m => m.sender_id == receiverDetails.id); // between receiver and receipt
                if (!chatExistSender && !chatExistsReceipt) { // if both are false then i will create a new placeholder for the new chat
                  const newChatPlaceholder = {
                    id : "new",
                    recipient_id: receiverDetails?.id,
                    messages: [],
                    receiver_username: receiverDetails?.username,
                    sender_username: userDetails?.username,
                    sender_id: user_id
                  };
                  getUserMessages.unshift(newChatPlaceholder);
                  setMessages(getUserMessages)
                  setSelectedId(getUserMessages[0].id)
                  onChatSelect(getUserMessages[0]);  
                } else {
                  setMessages(getUserMessages) 
                  setSelectedId(getUserMessages[0].id)
                  onChatSelect(getUserMessages[0]);        
                }
              } catch(err) {
                console.error('Error fetching messages:', err);
              } finally {
                setLoading(false); 
              }  
            }





  
          }
        }
        fetchData()
      },[user_id, receiverDetails, userDetails, token, helpOferUserId])   
   
  
      






    //     if (userDetails) {
    //       if(helpOferUserId == null) {
    //         try {
    //           let getUserMessages = await getAllMessagesByUserId(user_id, token);
    //           if (getUserMessages == null)  {
    //             // need to create a place holder here for no messages
    //             const placeHolderNoMessages = {
    //               id : "new",
    //               recipient_id: "new",
    //               messages: [],
    //               receiver_username: "You have no messages",
    //               sender_username: userDetails?.username,
    //               sender_id: user_id
    //             };
    //             messagesData.unshift(placeHolderNoMessages)
                
    //           } else {
    //             setMessages(getUserMessages);
    //             if (getUserMessages.length > 0) {
    //               setSelectedId(getUserMessages[0].id);
    //               onChatSelect(getUserMessages[0]); 
    //             }
    //           }
    //         } catch(err) {
    //           console.log("Error fetching user's messages", err);
    //         } finally {
    //           setLoading(false);
    //         }  
    //       } 
    //       else if (receiverDetails && helpOferUserId !== null) {
    //         try{
    //           let messagesData = await getAllMessagesByUserId(user_id, token);
    //           setMessages(messagesData);
    //           let chatExists = messagesData.some(m => m.recipient_id === user_id);

    //           if (!chatExists) {
    //             const newChatPlaceholder = {
    //               id : "new",
    //               recipient_id: receiverDetails?.id,
    //               messages: [],
    //               receiver_username: receiverDetails?.username,
    //               sender_username: userDetails.username,
    //               sender_id: user_id
    //             };
    //             messagesData.unshift(newChatPlaceholder);
    //           }
    //           setMessages(messagesData);
    //         } catch (err) {
    //           console.error('Error fetching messages:', err);
    //         } 
    //         finally {
    //           setLoading(false);
    //         }  
    //       }   
    //   };
    // }
    //   fetchData();
    // }, [ user_id, receiverDetails, userDetails, token, helpOferUserId]);
    
    const handleConversationClick = (message) => {
      onChatSelect(message);
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
            <ListGroup.Item   className={selectedId === message.id ? 'selected' : ""} key={message.id} onClick={() => handleConversationClick(message)} >
              {message.sender_username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );    
}

export default ChatListComponent;
