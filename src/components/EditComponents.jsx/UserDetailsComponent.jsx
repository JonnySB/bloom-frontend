import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./UserDetails.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

function UserNavbar({ userDetails }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Container className='user-details'>
            <div className="profileEdit">
                <Card>
                    <Card.Img variant="top" src={userDetails?.avatar_url_string} className='profileAvatar'/>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{userDetails?.first_name} {userDetails?.last_name}</ListGroup.Item>
                        <ListGroup.Item>{userDetails?.email}</ListGroup.Item>
                        <ListGroup.Item>{userDetails?.address}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
            <div className="navbar-container"> {/* Adjust this wrapper as needed */}
                <Navbar expand="lg" className="bg-body-tertiary">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Manage Request</Nav.Link>
                            <Button variant="primary" onClick={handleShow}>Edit Profile</Button>
                            <Nav.Link href="#link">Settings</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </div>
        </Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Edit your information</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
  }

export default UserNavbar;


