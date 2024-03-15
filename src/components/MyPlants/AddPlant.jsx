import { useState, useEffect } from 'react';
import {CloseButton, Button, Modal, Form} from 'react-bootstrap'
import { updatePlantsQuantity, assignPlant } from '../../services/userPlants';
import { fetchPlants, fetchPlantsFROMAPI } from '../../services/plants';
import axios from 'axios';

const AddPlant = ({ myPlants, refreshPlants }) => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("0")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"))
    const [plants, setPlants] = useState(null)
    
    
    useEffect(() => {
        async function fetchData() {
            try {
                const myplants = await fetchPlantsFROMAPI(token)
                setPlants(myplants);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        fetchData();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        let doesExist = myPlants.some(plant => plant.id.toString() === type); 
        try {
            if (doesExist) {
                await updatePlantsQuantity(userId, type, quantity, token);
            } else {
                await assignPlant(userId, type, quantity, token);
            }
            refreshPlants();
        } catch (error) {
            console.error('Error updating or assigning plant:', error);
        }
    };

    const handleShow = () => {
        setShow(true);
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
            <Modal show={show}  >
                <Modal.Header>
                    <Modal.Title>Add a new plant to your collection</Modal.Title>
                    <CloseButton onClick={() => setShow(false)} />
                </Modal.Header>
                <Modal.Body>
                    <Form id="addingPlants"  onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={onTypeChange}>
                                <option>What type of plant are you adding?</option>
                                {plants?.map((plant) => (
                                    <option value={plant.plant_id} key={plant.plant_id} label={plant.common_name}>{plant.common_name}</option> 
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="addingPlants" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPlant;


