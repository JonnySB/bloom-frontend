import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Col, Row, CloseButton, Pagination, Button, Modal, Container  } from 'react-bootstrap'
import "./PlantCards.css"
import { deletePlantsFromUser } from '../../services/userPlants';
import { useState } from 'react';

const PlantCards = ({ myPlants, refreshPlants }) => {
  const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(myPlants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlants = myPlants.slice(indexOfFirstItem, indexOfLastItem);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <>
    <Container>
      <Row xs={1} md={5} className="plantcard">
        {currentPlants?.map((plant, index) => (
          <Col key={index}>
            <Card>
              <Card.Header className="plantCardHeader">
                {plant.common_name} 
                <CloseButton onClick={() => confirmDelete(plant.plant_id)} />
              </Card.Header>
              <Card.Body style={{ minHeight: "10rem" }}>
                <Card.Img variant="top" src={plant.photo} />
                <Card.Title>
                  {plant.latin_name} 
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
      </Container>
      <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
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

