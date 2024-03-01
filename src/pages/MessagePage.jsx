import ChatListCompoenent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageHeaderComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'

export const MessagePage = () => {
    return (
        <Container className="message-page-container">
            <ChatListCompoenent />
            <MessageContainer />
        </Container>
    )
}