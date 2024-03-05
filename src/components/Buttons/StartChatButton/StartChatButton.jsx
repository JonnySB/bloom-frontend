import Button from "react-bootstrap/Button";

const StartChatButton = ({ handleClick }) => {
  return (
    <Button vaient="info" size="sm" onClick={handleClick}>
      Start Chat
    </Button>
  );
};

export default StartChatButton;
