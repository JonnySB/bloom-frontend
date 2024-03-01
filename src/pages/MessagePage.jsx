import ChatListComponent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState, useEffect } from "react";
import { getAllMessagesByUserId } from "../services/messages";

export const MessagePage = () => {
    const [messages, setMessages] = useState([])
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let messagesData = await getAllMessagesByUserId(1);
                setMessages(messagesData);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <Container className="message-page-container">
             <ChatListComponent message={messages} onChatSelect={setSelectedChat} />
            <MessageContainer selectedChat={selectedChat} />
        </Container>
    )
}