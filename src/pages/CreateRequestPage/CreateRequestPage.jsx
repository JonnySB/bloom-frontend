import React, { useEffect, useState } from 'react'
import CreateHelpRequestForm from '../../components/CreateRequestForm/CreateHelpRequestForm'
import { getAllRequestsByOneUser, deleteHelpRequestFromUser } from '../../services/HelpRequests'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import ManageHelpRequestsNavBar from '../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar'
import { useUser } from '../../context/UserContext.jsx';
import { Card, CloseButton, Row, Button, Modal } from 'react-bootstrap'
import "./CreateRequestPage.css"
import logo from "../../assets/Bloom_logo.png"



const CreateRequestPage = () => {
    const { userData, refreshUserData } = useUser();
    const userID = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")
    const [myRequest, setMyRequests] = useState([]);
    const [show, setShow] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [deleted, setDeleted] = useState(false);

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
        fetchAllRequestsByOneUser().then(() => setDeleted(false));
    }, [deleted])

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

    const handleDelete = async () => {
        if (cardToDelete) {
            try {
                await deleteHelpRequestFromUser(userID, cardToDelete, token);
                setShow(false);
                setDeleted(true);
            } catch (err) {
                console.error('Error deleting the plant:', err);
            }
        }
    };


    const confirmDelete = (itemId) => {
        setCardToDelete(itemId);
        setShow(true);
    };

    console.log(myRequest)
    return (
        <div className="page-container">
            <NavbarComponent userDetails={userData} refeshUserData={refreshUserData} />
            <div className='content-container'>
                <div className="logo-container">
                    <img alt='logo' style={{ width: 500 }} src={String(logo)} />
                </div>
                <div className="content-width">
                    <ManageHelpRequestsNavBar
                        requestsActive={true}
                        receivedOffersActive={false}
                        helpOffersActive={false}
                    />
                </div>
                <div className='crequestRequestBar'>
                    <p>Hello <strong>{userData?.username}</strong> see your requests below you can also create make a new request:  </p>
                    <CreateHelpRequestForm />
                </div>
                <div className="helpRequestContainer">
                    <Row xs={1} md={4} className="helpRequestInsideContainer">
                        {myRequest?.map((item, index) => (
                            <Card className='helpRequestCard' key={index}>
                                <Card.Header className="helpRequestHeader">
                                    <CloseButton onClick={() => confirmDelete(item.id)} />
                                </Card.Header>
                                <Card.Img variant="top" src={item?.plant_photos[0] == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709825357/PLANTS/Cover_zohttr.png" : item?.plant_photos[0]} />
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
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this plant?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}

export default CreateRequestPage
