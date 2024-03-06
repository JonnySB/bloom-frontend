import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { getUserPlants } from "../../services/userPlants";

const PlantCards = (props) => {
  const [userPlantList, setUserPlantList] = useState(
    [{id: 0, common_name: "Placeholder plant", latin_name: "Plantus placeholderious", watering_frequency: 7}]);
  const [userId, setUserId] = useState(
    window.localStorage.getItem("user_id")
  );
  const [token, setToken] = useState(
    window.localStorage.getItem("token")
  );

  useEffect(() => {
    getUserPlants(userId, token).then((data) => {
      console.log(data);
      if (data) {
        setUserPlantList(data)
      };
    });
  }, []);

  // const slicedList = plantList.toReversed().slice(0, 5)
  return (
    <Row
      xs={1}
      md={4}
      className="g-4"
      style={{
        minWidth: "20rem",
        padding: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {userPlantList.map((plant) => (
        <Col>
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
