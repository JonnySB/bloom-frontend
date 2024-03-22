import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Modal, Row, Container, CloseButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowPlants.css"
import { useState } from 'react';
import { deleteHelpRequestFromUser } from '../../services/HelpRequests'

const RequiredOffersCard = ({ userOffers, userDetails }) => {
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
    const token = window.localStorage.getItem("token")
    const [cardToDelete, setCardToDelete] = useState(null);
    const [show, setShow] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GDP' }).format(price);
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
    }

    const confirmDelete = (itemId) => {
        setCardToDelete(itemId);
        setShow(true);
    };

    const handleDelete = async () => {
        if (cardToDelete) {
            try {
                await deleteHelpRequestFromUser(userId, cardToDelete, token);
                setShow(false);
                setDeleted(true);
                location.reload();
            } catch (err) {
                console.error('Error deleting the plant:', err);
            }
        }
    };

    return (
        <>
            <Container className="title">
                <h1>Requests for help</h1>
                {userDetails?.user_id == userId || userDetails == userId ? 
                <Link to="/create_request" className="link-button">See all requests</Link>
                : ""}
            </Container>
                    <Row xs={1} md={4} className="plantcard">
                        {userOffers?.slice(0, 4).reverse().map((item, index)=> (
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
                        
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>
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
      
        </>
    );
};

export default RequiredOffersCard;
