import { useNavigate } from "react-router-dom";
import {Card, Row, Button, Modal, Image  } from 'react-bootstrap'
import './HelpRequest.css'
import { useState } from 'react';
import CreateOfferForm from '../../components/CreateOfferForm/CreateOfferForm';

const HelpRequest = ({ helpRequestsWithUsers }) => {
    const [show, setShow] = useState(false);
    const [fullItem, setFullItem] = useState("")
    const [requestId, setRequestId] = useState("")
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));

    const handleProfileNavigate = (item) => {
        if(user_id == item.user_id) {
            navigate(`/Profile`);
        } else {
        navigate(`/Profile/user/${item.user_id}`, { state: { item } });
        }
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(price);
    };
    const handleShow = (item) => {
        setRequestId(item.id)
        setFullItem(item)
        setShow(true);
    }
    
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

    return (

        <>
    <div className="helpRequestContainer">
        <Row xs={1} md={5} className="helpRequestInsideContainer">
            {helpRequestsWithUsers?.map((item, index) => (
            <Card className='helpRequestCard' key={index}>
                 <Card.Header className="helpRequestHeader">
                 <Image className="helpRequestImage" src={item?.avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : item?.avatar_url_string} roundedCircle style={{ width: '30px', height: '30px' }} onClick={() => handleProfileNavigate(item)} />
                 <Card.Text>{item?.first_name} {item?.last_name}</Card.Text>
              </Card.Header>
                <Card.Img variant="top" src={item?.plant_photo == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709825357/PLANTS/Cover_zohttr.png" : item.plant_photo} />
                <Card.Body className="helpRequestBody">
                <Card.Title className="helpRequestTitle">{item?.title}</Card.Title>
                <Card.Text className="helpRequestMessage">{handleMessageSize(item?.message)}</Card.Text>
                <Card.Text className="helpRequestDate"> From : {item?.start_date} to {item?.end_date}</Card.Text>
                <Card.Text className="helpRequestPrice">Price offered {formatPrice(item?.maxprice)}</Card.Text>
                <Button className="helpRequestButton" onClick={() => handleShow(item)}>See full details and make an offer</Button>
                </Card.Body>
            </Card>
            ))}
        </Row>
    </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{fullItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="helpRequestModalBody">{fullItem.message}</Modal.Body>
            <Modal.Footer className="helpRequestModalfooter">Starting date : {fullItem.start_date} to {fullItem.end_date} {formatPrice(fullItem.maxprice)}</Modal.Footer>
            <CreateOfferForm id={requestId} onSubmitSuccess={() => {handleClose()}} />
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal>
    </>

    )
}

export default HelpRequest;



