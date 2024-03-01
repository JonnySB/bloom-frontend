import React, { useState, useEffect } from 'react'
import ViewButton from '../Button/ViewButton';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './HelpRequest.css'
import Col from 'react-bootstrap/Col';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const HelpRequest = (props) => {
    
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        navigate("/help_request_details");
    }
    
    
    return (
        <div className='main-help-request-div'>
            <Col>
                <Card >
                    <Card.Body>
                        <div className='profile-image-and-username'>
                                {/* The image bellow is temporary and a placeholder for now  */}
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                                    alt="Profile"
                                    className="profile-image"
                                />
                            {/* This is a placeholder for user information */}
                            <p>username</p>
                        </div>
                        {/* The image bellow is temporary and a placeholder for now  */}
                    <Card.Img variant="top" src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg" />
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>
                        <Card.Text>{props.message}</Card.Text>
                        <ViewButton onClick={() => handleSubmit(props.id)}>View</ViewButton>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default HelpRequest