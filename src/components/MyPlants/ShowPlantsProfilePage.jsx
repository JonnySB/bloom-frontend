import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row} from "react-bootstrap";

const PlantCards = ({userPlants}) => {
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
      {userPlants?.slice(0, 5).reverse().map((plant, index) => (
        <Col key={index}>
          <Card>
            <Card.Body style={{ minHeight: "10rem" }}>
              <Card.Title>
                {plant.common_name} (<em>{plant.latin_name}</em>)
              </Card.Title>
              <Card.Text>{plant.description}</Card.Text>
              <Card.Text>
                Watering Frequency: Approximately every{" "}
                {plant.watering_frequency} days
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PlantCards;