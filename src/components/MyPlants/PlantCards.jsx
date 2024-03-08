import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row , Button } from 'react-bootstrap'
import "./ShowPlants.css";
import "./PlantCards.css"

const PlantCards = ({ myPlants }) => {
 
  // const slicedList = plantList.toReversed().slice(0, 5)
  return (
    <Row
      xs={1}
      md={4}
      className="plantcard"
      style={{
        minWidth: "20rem",
        padding: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {myPlants.map((plant, index) => (
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
