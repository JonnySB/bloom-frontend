import Button from "react-bootstrap/Button";

const AcceptButton = ({ handleClick }) => {
  return (
    <Button vaient="sucess" size="sm" active onClick={handleClick}>
      Accept Offer
    </Button>
  );
};

export default AcceptButton;
