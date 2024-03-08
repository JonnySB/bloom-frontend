import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updatePlantsQuantity, assignPlant } from '../../services/userPlants';

const AddPlant = ({userPlants}) => {
    const [show, setShow] = useState(false);
    const [plantList, setPlantList] = useState([{ id: 1, common_name: "Placeholder plant" }]);
    const [type, setType] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"))
    const [plantDetails, setPlantDetails] =  useState({});
    const [quantityDetails, setQuantityDetails] =  useState({});

    const handleShow = () => {
        setShow(true);
    };



    

    const handleSubmit = () => {
        let plantAlreadyAdded = userPlants.some(m => m.recipient_id === senderUserID);

        if (userPlants.includes(type)) {
            updatePlantsQuantity(userId, type, quantity, token)
        } else {
            assignPlant(userId, type, quantity, token)
                userPlants.push(type)
        }
      

    };
    // console.log(props)
    // const handleSubmit = () => {
    //     if (userPlants.includes(type)) {
    //         updatePlantsQuantity(userId, type, quantity, token)
    //     } else {
    //         assignPlant(userId, type, quantity, token)
    //             .then(() => {
    //                 // Assuming updateUserPlants is a new prop function that correctly updates parent state
    //                 props.updateUserPlants(type); 
    //             });
    //     }
    //     handleClose();
    // };

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
            <Modal show={show} onClick={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add a new plant to your collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addingPlants">
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="userEditForm" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPlant;
