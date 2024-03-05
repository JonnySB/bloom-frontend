import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateHelpRequestForm = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxprice, setMaxprice] = useState(0);

    const handleTitleChange = (title) => {
        setTitle(title.target.value);
    }

    const handleMessageChange = (message) => {
        setMessage(message.target.value);
    }
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Allow only numbers and a maximum of two decimal places
    const handleMaxpriceChange = (maxprice) => {
        const value = maxprice.target.value;
        const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
        if (regex.test(value) || value === '') {
        setMaxprice(value);
        }
    }
    return (
        <>

            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Title"
                    autoFocus
                    onChange={handleTitleChange}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    placeholder="Details of your request here" 
                    onChange={handleMessageChange}
                    rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="text"
                        value={maxprice}
                        onChange={handleMaxpriceChange}
                        placeholder="0.00"
                    />
                    </Form.Group>
            </Form>
    </>
    )
}

export default CreateHelpRequestForm