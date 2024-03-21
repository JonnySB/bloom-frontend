import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Container, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowPlants.css"
import { useState } from 'react';


const RequiredOffersCard = ({ userOffers, userDetails }) => {
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));

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

    return (
        <>
            <Container className="title">
                <h1>Requests for help</h1>
                {userDetails?.user_id == userId || userDetails == userId ? 
                <Link to="/create_request" className="link-button">See all requests</Link>
                : ""}
            </Container>
            <div className="helpRequestContainer">
                    <Row xs={1} md={5} className="plantcard">
                        {userOffers?.map((item, index) => (
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
             </div>
        </>
    );
};

export default RequiredOffersCard;
