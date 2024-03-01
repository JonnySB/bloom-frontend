import ChatListCompoenent from "../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../components/MessageComponents.jsx/MessageHeaderComponent"
import { Container } from 'react-bootstrap';

export const MessagePage = () => {
    return (
        <Container>
            <ChatListCompoenent />
            <MessageContainer />
        </Container>
    )
}