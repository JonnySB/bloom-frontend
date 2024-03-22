import { useState, useEffect } from 'react';
import { CloseButton, Button, Modal, Form, Card, Container } from 'react-bootstrap';
import { updatePlantsQuantity, assignPlant } from '../../services/userPlants';
import { createNewPlant, fetchPlantsByName } from '../../services/plants';
import './AddPlantsStyle.css';
import { useNavigate } from "react-router-dom";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

const AddPlant = ({ refreshPlants, myPlants }) => {
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState("0");
    const [waterQuantity, setWaterQuantity] = useState("0");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
    const [plantName, setPlantName] = useState("");
    const [plantImage, setPlantImage] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState("");
    const debouncedSearchTerm = useDebounce(plantName, 500);
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchSuggestions && debouncedSearchTerm) {
            fetchPlantsByName(token, debouncedSearchTerm)
                .then(data => {
                    setSuggestions(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newPlantResponse = await createNewPlant(selectedPlant, waterQuantity, token);
            let effectiveWaterQuantity = waterQuantity;
            if (effectiveWaterQuantity === "0" || effectiveWaterQuantity === "" || effectiveWaterQuantity === 0) {
                effectiveWaterQuantity = 1;
            }
            console.log(waterQuantity)
            if (newPlantResponse.message === "Plant inserted in the database successfully" || newPlantResponse.message === "Plant already exists in the database.") {
                const doesUserHasThisPlant = myPlants?.some(p => p.plant_id === newPlantResponse.plant_id)
                if (doesUserHasThisPlant) {
                    await updatePlantsQuantity(userId, newPlantResponse.plant_id, quantity, token);
                } else {
                    await assignPlant(userId, newPlantResponse.plant_id, effectiveWaterQuantity, token);
                }
            } else {
                console.error('Unexpected response:', newPlantResponse.message);
                return;
            }
            refreshPlants();
        } catch (error) {
            console.error('Error updating or assigning plant:', error);
        }
    };

    
    const handleProfileNavigate = () => {
        navigate(`/Profile`, { state: { userId } });
    }

    const handleShow = () => {
        setShow(true);
    };

    const onTypeChageForPlant = (e) => {
        setPlantName(e.target.value);
        setFetchSuggestions(true);
    };

    const onQuantityChange = (e) => {
        if (e.target.value === "") {
            setQuantity("1");
        } else {
            setQuantity(e.target.value);
        }
    };

    const selectSuggestion = (suggestion) => {
        setSelectedPlant(suggestion);
        setPlantName(suggestion.common_name || suggestion.latin_name);
        setPlantImage(suggestion.photo);
        setSuggestions([]);
        setFetchSuggestions(false);
    };

    const waterQuantityChange = (e) => {
        setWaterQuantity(Number(e.target.value));
    };

    return (
        <> 
        <Container>
        <div className="navBarMyPlantsPage">
            <Button className='back-to-profile-button'  onClick={handleProfileNavigate}> ← Back to Profile Page</Button>
            <Button className='add-plants-button'  onClick={handleShow}>Add a Plant</Button>
        </div>
        </Container>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Add a new plant to your collection</Modal.Title>
                <CloseButton onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
                <Form id="addingPlants" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="searchByNameInput">
                        <Form.Label>Search by name</Form.Label>
                        <Form.Control type="text" placeholder="Example: Coconut..." value={plantName} onChange={onTypeChageForPlant} />
                        <div className="autocomplete-suggestions">
                            {suggestions.map((suggestion, index) => (
                                <div className="suggestion-item" key={index} onClick={() => selectSuggestion(suggestion)}>
                                    {suggestion.common_name || suggestion.latin_name}
                                </div>
                            ))}
                        </div>
                        {plantImage.length > 0  ? (
                            <div className='myPlantCardTwo'>
                                <Card.Title>See plant picture below</Card.Title>
                                <Card.Img variant="top" src={plantImage} />
                            </div>
                            
                        ) : ""}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter quantity</Form.Label>
                        <Form.Control type="text" placeholder="How many of these plants do you own?" onChange={onQuantityChange} />
                    </Form.Group>
                    <Form.Label>How often do you water this plant per week</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={waterQuantityChange}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="3">More than 3 times</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" className="buttonSaveAddPlant" type="submit" form="addingPlants" onClick={() => setShow(false)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default AddPlant;
