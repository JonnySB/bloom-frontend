
import React, { useState, useEffect } from "react";
import { getAllMessagesByUserId } from "../../services/messages";
import { getMessagesById } from "../../services/messages";

function Messages() {
const [messages, setMessages] = useState([])

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
        <div>
            {messages.map(message => (
                <div key={message.id}>From user {message.sender_id}: {message.message}</div>
            ))}
        </div>
    );
}

export default Messages