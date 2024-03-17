import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowPlants.css"

const PlantCards = ({userPlants}) => {
  return (
    <>
    <Container className="title">
        <h1>Plants owned</h1>
        <Link to="/myplants" className="link-button">Expand</Link>
    </Container>
    <Row xs={1} md={5} className="plantcard">
      {userPlants?.slice(0, 5).reverse().map((plant, index) => (
        <Col key={index}>
          <Card>
            <Card.Body style={{ minHeight: "10rem" }}>
            <Card.Img variant="top" src={plant.photo} />
              <Card.Title>
                {plant.common_name} (<em>{plant.latin_name}</em>)
              </Card.Title>
              <Card.Text className="waterFrequency"> Watering Frequency: Approximately {plant.watering_frequency == 1 ? "once a week" : `${plant.watering_frequency} times a week`} </Card.Text>
              <Card.Text className="quantity"> Quantity: {plant.quantity} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default PlantCards;