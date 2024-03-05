import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updatePlantsQuantity, assignPlant } from '../../services/userPlants';
import { fetchPlants } from '../../services/plants';

const AddPlant = (props) => {
    // Note: This component needs user_id and user_plants passed into it as props.
    // user_plants should be an array of plant_id of plants belonging to user.
    const [show, setShow] = useState(false);
    const [userPlants, setUserPlants] = useState(props.user_plants)
    const [plantList, setPlantList] = useState([]);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0)
    const [token, setToken] = useState(window.localStorage.getItem("token"))

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchPlants(token)
            .then((data) => {
                setPlantList(data)
                console.log(data)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    const handleSubmit = () => {
        console.log(userPlants)
        if (userPlants.includes(type)) {
            updatePlantsQuantity(props.user_id, type, quantity, token)
                .then((data) => {
                    setToken(data.token)
                    window.localStorage.setItem("token", data.token)
                });
        } else {
            assignPlant(1, type, quantity, token)
                .then((data) => {
                    userPlants.push(type)
                    setToken(data.token)
                    window.localStorage.setItem("token", data.token)

                });
        }
    };

    const onTypeChange = (e) => {
        setType(e.target.value)
    }

    const onQuantityChange = (e) => {
        setQuantity(Number(e.target.value))
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
                  <option value={plant.id} key={plant.id} label={plant.common_name}>{plant.common_name}</option>
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
