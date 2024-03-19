import React, { useEffect, useState } from 'react'
import CreateHelpRequestForm from '../../components/CreateRequestForm/CreateHelpRequestForm'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import { getAllRequestsByOneUser } from '../../services/HelpRequests'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import ManageHelpRequestsNavBar from '../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar'
import { useUser } from '../../context/UserContext.jsx';
import {Card, Col, Row, Button, Modal, Container, Image  } from 'react-bootstrap'

const CreateRequestPage = () => {
    const { userData, refreshUserData } = useUser();
    const userID = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")
    const [myRequest, setMyRequests] = useState([]);

    useEffect(() => {
        const fetchAllRequestsByOneUser = async () => {
            try {
                const data = await getAllRequestsByOneUser(userID, token);
                // Sort the data by ID in descending order
                const sortedData = data.sort((a, b) => b.id - a.id);
                setMyRequests(sortedData);
            } catch (error) {
                console.error(`Error fetching GET all requests made by current user with user_id: ${userID}`, error)
            }
        }
        fetchAllRequestsByOneUser()
    }, [])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(price);
    };
    
    const handleMessageSize = (message) => {
        if (!message) return ""; 
        const words = message.split(" ");
        const fullSize = words.length;
        const maxWordsToShow = 8;
    
        if (fullSize > maxWordsToShow) {
            return (
                <>
                    {words.slice(0, maxWordsToShow).join(" ")}
                    <br />
                    <strong>(See full message below)</strong>
                </>
            );
        } else {
            return message;
        }
    };
    console.log(myRequest)

    return (
        <>
             <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
            <h1>Create help request page</h1>
            <ManageHelpRequestsNavBar />
            <div><CreateHelpRequestForm /></div>
            <div className="helpRequestContainer">
        <Row xs={1} md={5} className="helpRequestInsideContainer">
            {myRequest?.map((item, index) => (
            <Card className='helpRequestCard' key={index}>
                 <Card.Header className="helpRequestHeader">
             
                </Card.Header>
                <Card.Img variant="top" src="https://res.cloudinary.com/dououppib/image/upload/v1709825357/PLANTS/Cover_zohttr.png" />
                <Card.Body className="helpRequestBody">
                <Card.Title className="helpRequestTitle">{item?.title}</Card.Title>
                <Card.Text className="helpRequestMessage">{handleMessageSize(item?.message)}</Card.Text>
                <Card.Text className="helpRequestDate"> From : {item?.start_date} to {item?.end_date}</Card.Text>
                <Card.Text className="helpRequestPrice">Price offered {formatPrice(item?.maxprice)}</Card.Text>
                <Button className="helpRequestButton" onClick={() => handleShow(item)}>Edit details</Button>
                </Card.Body>
            </Card>
            ))}
        </Row>
    </div>

        </>
    )
}

export default CreateRequestPage
