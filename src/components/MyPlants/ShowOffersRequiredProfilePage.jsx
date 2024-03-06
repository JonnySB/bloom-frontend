import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, Container} from "react-bootstrap";
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
        <Link>Expand</Link>
    </Container>
    <Row xs={1} md={5} className="g-4">
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
                
                {formatPrice(offer.maxprice)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default RequiredOffersCard;