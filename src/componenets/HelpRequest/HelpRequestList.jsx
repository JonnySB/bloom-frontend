import React, { useState, useEffect } from 'react'
import { getAllHelpRequests } from '../../services/HelpRequests';
import ViewButton from '../Button/ViewButton';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './HelpRequestList.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HelpRequestList = () => {
    const [helpRequests, setHelpRequests] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchAllHelpRequests = async () => {
    //         try {
    //             const allHelpRequests = await getAllHelpRequests();
    //             console.log("TRY BLOCK: all help requests", allHelpRequests)
    //             setHelpRequests(allHelpRequests);
    //             console.log("my requests", allHelpRequests); 
    //             console.log("set help requests => ", setHelpRequests)
    //         } catch (error) {
    //             console.error("Error", error);
    //             console.log("CATCH BLOCK: error getting requests from help request services")
    //         }
    //     };
    //     fetchAllHelpRequests();
    // }, []);

    useEffect(() => {
        fetch(`${BACKEND_URL}/help_requests`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch help requests')
            }
            return response.json();
        })
        .then(data => {
            setHelpRequests(data);
        })
        .catch(error => {
            console.error('Error fetching help requests: ', error);
        });
    }, []);

    const handleSubmit = () => {
        navigate("/help_request_details");
    }
    
    
    return (
        <div>
            <h2>Help Request Component</h2>
            <Row xs={1} md={4} className="g-4">
                {helpRequests.map(helpRequest => (
                    <Col key={helpRequest.id}>
                        <Card className='help_request_card'>
                            <div className='inner_card'>
                                {/* The image bellow is temporary and a placeholder for now */}
                                <Card.Img variant="top" src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg" />
                                <Row>
                                        <div className="profile-image-container">
                                            {/* The image bellow is temporary and a placeholder for now  */}
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                                                alt="Profile"
                                                className="profile-image"
                                            />
                                        </div>
                                        <Card.Title>{helpRequest.title}</Card.Title>
                                </Row>
                                <Card.Body>
                                    
                                    {/* <Card.Text>{helpRequest.message}</Card.Text>
                                    <Card.Text>{helpRequest.date}</Card.Text>
                                    <Card.Text>{helpRequest.start_date}</Card.Text>
                                    <Card.Text>{helpRequest.end_date}</Card.Text>
                                    <Card.Text>{helpRequest.maxprice}</Card.Text> */}
                                    <ViewButton onClick={() => handleSubmit(helpRequest.id)}>View</ViewButton>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HelpRequestList