import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createHelpRequest } from '../../services/HelpRequests';
import { useNavigate } from 'react-router-dom';

const CreateHelpRequestForm = (props) => {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxprice, setMaxprice] = useState(0);

    const token = window.localStorage.getItem("token");
    const userID = window.localStorage.getItem("user_id");
    const navigate = useNavigate();

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
        } else {
            console.log("Make sure you enter in the following format: 00.00")
        }
    }

    const handleSubmitRequest = () => {
        createHelpRequest(title, message, startDate, endDate, maxprice, userID, token)
            .then((data) => {
                console.log("Data -> ", data)
                console.log("Successfully created a help request")
                navigate("/")
            })
            .catch((error) => {
                console.error("Error fetching create request: ", error)
                alert("Sorry, there was an error!")
            })
    }
    return (
        <>

            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
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
                        value={message}
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
                <Button variant="primary" onClick={handleSubmitRequest}>
                    Submit Request
                </Button>
            </Form>
        </>
    )
}

export default CreateHelpRequestForm
