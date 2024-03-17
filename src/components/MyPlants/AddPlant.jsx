import { useState, useEffect } from 'react';
import {CloseButton, Button, Modal, Form} from 'react-bootstrap'
import { updatePlantsQuantity, assignPlant } from '../../services/userPlants';
import { fetchPlantsFROMAPI, createNewPlant, fetchPlantsByName } from '../../services/plants';



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

const AddPlant = ({ refreshPlants }) => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("0")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"))
    const [plants, setPlants] = useState(null)
    const [plantName, setPlantName] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const debouncedSearchTerm = useDebounce(plantName, 500); 
    

    useEffect(() => {
        if (debouncedSearchTerm) {
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
        try {
            const newPlantResponse = await createNewPlant(type, token);
            if (newPlantResponse.message === "Plant Created successfully") {
                await assignPlant(userId, newPlantResponse.plant_id, quantity, token);
            } 
            else if (newPlantResponse.message == "Plant already exists.") {
                await updatePlantsQuantity(userId, newPlantResponse.plant_id, quantity, token);
            }  
            else {
                console.error('Unexpected response:', newPlantResponse.message);
                return; 
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
        const plantData = JSON.parse(e.target.value);
        setType(plantData)
    }
    const onTypeChageForPlant = (e) => {
        setPlantName(e.target.value)
    }

    const onQuantityChange = (e) => {
        setQuantity(Number(e.target.value))
    }
    console.log(suggestions)
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
                            <Form.Label>Search for by type</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={onTypeChange}>
                                <option>What type of plant are you adding?</option>
                                {plants?.map((plant) => (
                                    <option  key={plant.plant_id} 
                                    value={JSON.stringify({
                                        plant_id: plant.plant_id,
                                        common_name: plant.common_name,
                                        latin_name: plant.latin_name,
                                        url: plant.photo
                                    })}
                                    >
                                    {plant.common_name}
                                    </option> 
                                ))}
                            </Form.Select>
                        </Form.Group>

                       <Form.Group className="mb-3" controlId="searchByNameInput">
                        <Form.Label>Search by name</Form.Label>
                            <Form.Control type="text" placeholder="Cowgrass clover" onChange={onTypeChageForPlant}/>
                            <div className="autocomplete-suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <div key={index} onClick={() => setPlantName(suggestion.common_name)}>
                                        {suggestion.common_name || suggestion.latin_name}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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


