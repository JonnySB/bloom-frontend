import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row} from "react-bootstrap";

const RequiredOffersCard = ({ userOffers }) => {
  return (
    <Row
      xs={1}
      md={5}
      className="g-4"
      style={{
        minWidth: "20rem",
        padding: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >

      {userOffers?.slice(0, 5).reverse().map((offer, index) => (
        <Col key={index}>
          <Card>
            <Card.Body style={{ minHeight: "10rem" }}>
              <Card.Title>
                {offer.title} 
              </Card.Title>
              <Card.Text>{offer.description}</Card.Text>
              <Card.Text>
                {offer.message}
                {offer.start_date}  {offer.end_date}
                {offer.maxprice}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RequiredOffersCard;