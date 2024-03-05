import { Container, Nav, Navbar, Card, ListGroup, Modal, Button, Form }from 'react-bootstrap';
import "./UserDetails.css"
import { useState, useEffect } from 'react';
import { editUsersInformation } from '../../services/users';

function UserNavbar({ userDetails }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [text, setText] = useState('');
    const [inputVisibility, setInputVisibility] = useState({
        firstName: false,
        lastName: false,
        userName: false,
        email: false,
        avatar: false,
        address: false,
    });

    const toggleInputVisibility = field => {
        setInputVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e, field) => {
        // Handle your input change logic here
        // This is just a placeholder function to illustrate
        setText(e.target.value);
    };





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
        <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your information</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        {inputVisibility.firstName ? 
                            <input type="text" value={text} onChange={e => handleChange(e, 'firstName')} /> : 
                            <>{userDetails?.first_name}<Button variant="primary" onClick={() => toggleInputVisibility('firstName')}>🖊️</Button></>}
                    </Modal.Body>
                    <Modal.Body>
                        {inputVisibility.lastName ? 
                            <input type="text" value={text} onChange={e => handleChange(e, 'lastName')} /> : 
                            <>{userDetails?.last_name}<Button variant="primary" onClick={() => toggleInputVisibility('lastName')}>🖊️</Button></>}
                    </Modal.Body>
                    <Modal.Body>
                        {inputVisibility.userName ? 
                            <input type="text" value={text} onChange={e => handleChange(e, 'userName')} /> : 
                            <>{userDetails?.username}<Button variant="primary" onClick={() => toggleInputVisibility('userName')}>🖊️</Button></>}
                    </Modal.Body>
                    <Modal.Body>
                        {inputVisibility.email ? 
                            <input type="text" value={text} onChange={e => handleChange(e, 'email')} /> : 
                            <>{userDetails?.email}<Button variant="primary" onClick={() => toggleInputVisibility('email')}>🖊️</Button></>}
                    </Modal.Body>
                    <Modal.Body>
                        {inputVisibility.address ? 
                            <input type="text" value={text} onChange={e => handleChange(e, 'address')} /> : 
                            <>{userDetails?.address}<Button variant="primary" onClick={() => toggleInputVisibility('address')}>🖊️</Button></>}
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Save Changes</Button>
                </Modal.Footer>
        </Modal>
    </>
    );
  }

export default UserNavbar;


