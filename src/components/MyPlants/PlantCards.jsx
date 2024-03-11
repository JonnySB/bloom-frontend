import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row  } from 'react-bootstrap'
import "./ShowPlants.css";
import "./PlantCards.css"

const PlantCards = ({ myPlants }) => {

  return (
    <Row xs={1} md={4} className="plantcard">
      {myPlants?.map((plant, index) => (
        <Col key={index}>
        <Card >
          <Card.Body style={{ minHeight: "10rem" }}>
          <Card.Img variant="top" src={plant.photo} />
            <Card.Title>
              {plant.common_name} (<em>{plant.latin_name}</em>)
            </Card.Title>
            <Card.Text>
              Watering Frequency: Approximately every{" "} {plant.watering_frequency} days
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      ))}
    </Row>
  );
};

export default PlantCards;
