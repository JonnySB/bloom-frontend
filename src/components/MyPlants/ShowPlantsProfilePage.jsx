import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, Container, Modal, Button, CloseButton} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowPlants.css"
import { useState } from 'react';


const PlantCards = ({myPlants, refreshPlants, userDetails}) => {
  const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);

  const confirmDelete = (plantId) => {
    setPlantToDelete(plantId);
    setShow(true);
  };

  const handleDelete = async () => {
    if (plantToDelete) {
      try {
        await deletePlantsFromUser(userId, plantToDelete, token);
        setShow(false); 
        refreshPlants(); 
      } catch (err) {
        console.error('Error deleting the plant:', err);
      }
    }
  };

  return (
    <>
     <Container className="title">
       <h1>Plants owned</h1>
       {userDetails?.user_id == userId || userDetails == userId ? 
       <Link to="/myplants" className="link-button">Expand</Link>
       : ""}
      </Container>
      <Row xs={1} md={5} className="plantcard">
        {myPlants?.slice(0, 5).reverse().map((plant, index) => (
          <Col key={index}>
            <Card>
              {userDetails?.user_id == userId || userDetails == userId ? 
              <Card.Header >
                {plant.common_name} 
              <CloseButton onClick={() => confirmDelete(plant.plant_id)} />
              </Card.Header>
              : ""}
              <Card.Body style={{ minHeight: "10rem" }}>
                <Card.Img variant="top" src={plant.photo} />
                <Card.Title>
                {plant?.latin_name}
                </Card.Title>
                <Card.Text className="waterFrequency"> 
                  Watering Frequency: Approximately {plant.watering_frequency === 1 ? "once a week" : `${plant.watering_frequency} times a week`} 
                </Card.Text>
                <Card.Text className="quantity"> 
                  Quantity: {plant.quantity} 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this plant?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default PlantCards;

