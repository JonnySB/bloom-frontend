import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, Container, CardGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowPlants.css"

const RequiredOffersCard = ({ userOffers }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GDP' }).format(price);
  };
  
  return (
    <>
    <Container className="title">
        <h1>Requests for help</h1>
        <Link to="" className="link-button">Expand</Link>
    </Container>
    <Row xs={1} md={5} className="myCard"> {/* Adjust the number of cards per row based on the screen width */}
      {userOffers?.slice(0, 5).reverse().map((offer, index) => (
        <Col key={index}>
          <Card>
            <Card.Body>
              <Card.Title>{offer.title}</Card.Title>
              <Card.Text>{offer.message}</Card.Text>
            </Card.Body>
            <Card.Footer>
              {formatPrice(offer.maxprice)}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default RequiredOffersCard;