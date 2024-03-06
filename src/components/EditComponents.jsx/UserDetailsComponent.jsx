
import { Container, Nav, Navbar, Card, ListGroup, Modal, Button, Form }from 'react-bootstrap';
import "./UserDetails.css"
import { useState, useEffect } from 'react';
import { editUsersInformation } from '../../services/users';

function UserNavbar({ userDetails }) {
    const [show, setShow] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [inputVisibility, setInputVisibility] = useState({
        firstName: false,
        lastName: false,
        userName: false,
        email: false,
        avatar: false,
        address: false,
    });

    const handleShow = () => {
        setFormDetails({
            firstName: userDetails?.first_name || '',
            lastName: userDetails?.last_name || '',
            userName: userDetails?.username || '',
            email: userDetails?.email || '',
            avatar: userDetails?.avatar_url_string || '',
            address: userDetails?.address || '',
        });
        setShow(true);
    };
 
  
    const toggleInputVisibility = field => {
        setInputVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e, field) => {
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [field]: e.target.value,
        }));
    };
 
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const updatedFormDetails = {
            userId: userDetails.id,
            firstName: formDetails.firstName || userDetails.first_name,
            lastName: formDetails.lastName || userDetails.last_name,
            userName: formDetails.userName || userDetails.username,
            email: formDetails.email || userDetails.email,
            address: formDetails.address || userDetails.address,
        };
    
        try {
            await editUsersInformation(updatedFormDetails, token);
            console.log("form submited")
            window.location.reload();
        } catch (err) {
            console.log('Edit not completed',err);
        }
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
            <div className="navbar-container"> 
            <div className='potted-image'>
                <img src='https://res.cloudinary.com/dououppib/image/upload/v1709756999/PLANTS/plant_banner.png'></img>
            </div>
                <Navbar expand="lg" className="bg-body-tertiary">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button variant="primary" onClick={handleShow}>Edit Profile</Button>
                        </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </div>
        </Container>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit your information</Modal.Title>
            </Modal.Header>
            <Form id="userEditForm" onSubmit={handleFormSubmit}>
                <Modal.Body>
                    {inputVisibility.firstName ? 
                        <input type="text" value={formDetails.firstName} onChange={e => handleChange(e, 'firstName')} /> : 
                        <>{userDetails?.first_name}<Button variant="primary" onClick={() => toggleInputVisibility('firstName')}>🖊️</Button></>}
                </Modal.Body>
                <Modal.Body>
                    {inputVisibility.lastName ? 
                        <input type="text" value={formDetails.lastName} onChange={e => handleChange(e, 'lastName')} /> : 
                        <>{userDetails?.last_name}<Button variant="primary" onClick={() => toggleInputVisibility('lastName')}>🖊️</Button></>}
                </Modal.Body>
                <Modal.Body>
                    {inputVisibility.userName ? 
                        <input type="text" value={formDetails.userName} onChange={e => handleChange(e, 'userName')} /> : 
                        <>{userDetails?.username}<Button variant="primary" onClick={() => toggleInputVisibility('userName')}>🖊️</Button></>}
                </Modal.Body>
                <Modal.Body>
                    {inputVisibility.email ? 
                        <input type="text" value={formDetails.email} onChange={e => handleChange(e, 'email')} /> : 
                        <>{userDetails?.email}<Button variant="primary" onClick={() => toggleInputVisibility('email')}>🖊️</Button></>}
                </Modal.Body>
                <Modal.Body>
                    {inputVisibility.address ? 
                        <input type="text" value={formDetails.address} onChange={e => handleChange(e, 'address')} /> : 
                        <>{userDetails?.address}<Button variant="primary" onClick={() => toggleInputVisibility('address')}>🖊️</Button></>}
                </Modal.Body> 
            </Form>
            <Modal.Footer>
             <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
             <Button variant="primary" type="submit" form="userEditForm" onClick={() => setShow(false)}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
  }

export default UserNavbar;


