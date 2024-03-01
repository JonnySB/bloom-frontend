import Button from "react-bootstrap/Button";

const RejectButton = ({ handleClick }) => {
  return (
    <Button vaient="danger" size="sm" onClick={handleClick}>
      Reject Offer
    </Button>
  );
};

export default RejectButton;
