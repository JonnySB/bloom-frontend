import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, CloseButton  } from 'react-bootstrap'
import "./ShowPlants.css";
import "./PlantCards.css"
import { deletePlantsFromUser } from '../../services/userPlants';

const PlantCards = ({ myPlants }) => {

  return (
    <Row xs={1} md={4} className="plantcard">
      {myPlants?.map((plant, index) => (
        <Col key={index}>
        <Card >
        <Card.Header>Featured
            <CloseButton  />
        </Card.Header>
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
  );
};

export default PlantCards;
