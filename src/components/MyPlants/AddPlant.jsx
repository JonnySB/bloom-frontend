import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updatePlantsQuantity } from '../../services/userPlants';
import { fetchPlants } from '../../services/plants';

function AddPlant() {
  const [show, setShow] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0)
  const [token, setToken] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTUwMDk2OSwianRpIjoiZGM1MjE4NzItZDZmMS00NzEwLWI4NWItZjIyZGJhNGQ3ODhmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzA5NTAwOTY5LCJjc3JmIjoiZWIyZDJlN2ItOTljZi00ZGZkLTgyYTctM2ZkMWY0N2E3NDE3IiwiZXhwIjoxNzA5NTAxODY5fQ.al7s1rsbpd__sEehECcSXhNuJq0NO2XgD-ccQqOlvn0"

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchPlants(token)
    .then((data) => {
      setPlantList(data)
    })
    .catch((err) => {
      console.error(err);
    });
  }, [])

  const handleSubmit = () => {
    updatePlantsQuantity(user_id, type, quantity, token)
  };

  const onTypeChange = (e) => {
    setType(e.target.value)
  }

  const onQuantityChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  const createOption = (currentPlant) => {
    return <option value={currentPlant}>{currentPlant}</option>
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a Plant 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new plant to your collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Type</Form.Label>
            <Form.Select aria-label="Default select example" onChange={onTypeChange}>
                <option>What type of plant are you adding?</option>
                {plantList.map((plant) => (
                  <option value={plant.id} key={plant.id}>{plant.common_name}</option>
                ))}
            </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter quantity</Form.Label>
              <Form.Control type="text" placeholder="How many of these plants do you own?" onChange={onQuantityChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPlant;