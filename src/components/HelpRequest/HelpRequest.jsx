import { useNavigate, Link } from "react-router-dom";
import {Card, Col, Row, Button, Modal, Container, Image  } from 'react-bootstrap'
import './HelpRequest.css'
import { useState, useEffect } from 'react';
import CreateOfferForm from '../../components/CreateOfferForm/CreateOfferForm';

const HelpRequest = ({ helpRequestsWithUsers }) => {
    const [show, setShow] = useState(false);
    const [fullItem, setFullItem] = useState("")
    const [requestId, setRequestId] = useState("")
    const handleClose = () => setShow(false);
    const navigate = useNavigate();



    const handleProfileNavigate = (e) => {
        navigate('/Profile')
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
    console.log(fullItem)
    return (
        <>
    <Container>
        <h1>BLOOM</h1>
        <Row xs={1} md={4} >
            {helpRequestsWithUsers?.map((item, index) => (
            <Card className='card-body2' key={index}>
                <Card.Img variant="top" src="https://res.cloudinary.com/dououppib/image/upload/v1709825357/PLANTS/Cover_zohttr.png" />
                <Card.Body>
                <Image src={item?.avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : item?.avatar_url_string} roundedCircle style={{ width: '30px', height: '30px' }} onClick={handleProfileNavigate}/>
                    {item?.first_name && <p role='firstnameAndLastname'>{item?.first_name}&nbsp;{item?.last_name}</p>}
                    <Card.Title>{item?.title}</Card.Title>
                </Card.Body>
                <Card.Text>{handleMessageSize(item?.message)}</Card.Text>
                <Card.Text> Starting date : {item?.start_date} to {item?.end_date}</Card.Text>
                <Card.Text>{formatPrice(item?.maxprice)}</Card.Text>
                <Button onClick={() => handleShow(item)}>See full details and make an offer</Button>
            </Card>
            ))}
        </Row>
    </Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{fullItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{fullItem.message}</Modal.Body>
            <Modal.Footer>Starting date : {fullItem.start_date} to {fullItem.end_date} per {fullItem.maxprice}</Modal.Footer>
            <CreateOfferForm id={requestId} onSubmitSuccess={() => {handleClose()}} />
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal>
    </>
    )
}

export default HelpRequest;



