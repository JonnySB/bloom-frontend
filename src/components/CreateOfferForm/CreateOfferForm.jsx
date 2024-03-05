import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import { createHelpOffer } from '../../services/HelpOffers';

const CreateOfferForm = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [bid, setBid] = useState(0);


    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleBidChange = (event) => {
        setBid(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleSubmitOffer = () => {
        try {
            createHelpOffer(props.id, message, status, user_id, bid, props.token)
            .then((data) => {
                props.setToken(data.token)
            })
        } catch(error) {
            console.error("Error fetching from form component", error)
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            Make offer
            </Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Make an offer to help</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Message</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        placeholder="Details of your request here" 
                        value={message}
                        onChange={handleMessageChange}
                        rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bid</Form.Label>
                        <Form.Control
                            type="text"
                            value={bid}
                            onChange={handleBidChange}
                            placeholder="0.00"
                        />
                        </Form.Group>
                        <Form.Select onChange={handleStatusChange} aria-label="Default select example">
                            <option>Select status</option>
                            <option value={status}>pending</option>
                        </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                Submit Offer
                </Button>
            </Modal.Footer>
            </Modal>
    </>
    )
}

export default CreateOfferForm