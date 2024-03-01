import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddPlant() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    //to call plant service and update userplant table with submitted values (type, quantity)
  };

  const onTypeChange = (e) => {
    setType(e.target.value)
  }

  const onQuantityChange = (e) => {
    setQuantity(e.target.value)
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
                <option value="Violet">Violet</option>
                <option value="Rose">Rose</option>
                <option value="Orchid">Orchid</option>
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