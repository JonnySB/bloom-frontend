import { Container, Nav, Navbar, Card, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import "./UserDetails.css"
import { useState, useEffect } from 'react';
import { editUsersInformation, editUserAvatar } from '../../services/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'; 

function UserNavbar({ userDetails, refeshUserData }) {
    const [show, setShow] = useState(false);
    const [showButtonPicutre, setShowButtonPicture] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));
    const [userAvatar, setUserAvatar] = useState();
    const [inputVisibility, setInputVisibility] = useState({
        firstName: false,
        lastName: false,
        userName: false,
        email: false,
        address: false,
    }); 

    const handleShow = () => {
        setFormDetails({
            firstName: userDetails?.first_name || '',
            lastName: userDetails?.last_name || '',
            userName: userDetails?.username || '',
            email: userDetails?.email || '',
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

    const handleShowProfilePicture = () => {
        setShowButtonPicture(true);
    };

    const handleProfilePicture = (event) => {
        const file = event.target.files[0];
        setUserAvatar(file);
    };

    const handleUserAvatar = async (event) => {
        event.preventDefault();
        try {
            await editUserAvatar(userAvatar, token, user_id);
            refeshUserData();
        } catch(err) {
            console.log('Edit not completed', err);
        }
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
            refeshUserData();
        } catch (err) {
            console.log('Edit not completed', err);
        }
    };

    return (
        <>
            <Container className='user-details'>
                <div className="profileEdit">
                    <Card>
                        <div className="image-container">
                            <img variant="top" src={userDetails?.avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : userDetails?.avatar_url_string} className='profileAvatar' />
                            <Button variant="primary" className="edit-picture-btn" onClick={handleShowProfilePicture}>
                                <FontAwesomeIcon icon={faCamera} />
                            </Button>
                        </div>
                        <Modal show={showButtonPicutre} onHide={() => setShowButtonPicture(false)}>
                            <Form id="userAvatar" className="mb-2" onSubmit={handleUserAvatar}>
                                <Modal.Body>
                                    <Form.Label for="avatarUpload">Upload file</Form.Label>
                                    <Form.Control type="file" accept="image/*"  id="avatarUpload" onChange={handleProfilePicture}/>
                                </Modal.Body>
                            </Form>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowButtonPicture(false)}>Close</Button>
                                <Button variant="primary" type="submit" form="userAvatar" onClick={() => setShowButtonPicture(false)}>Save Changes</Button>
                            </Modal.Footer>
                        </Modal>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{userDetails?.first_name} {userDetails?.last_name}</ListGroup.Item>
                            <ListGroup.Item>{userDetails?.username}</ListGroup.Item>
                            <ListGroup.Item>{userDetails?.email}</ListGroup.Item>
                            <ListGroup.Item>{userDetails?.address}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                <div className="navbar-container">
                    <div className='potted-image'>
                        <img src='https://res.cloudinary.com/dououppib/image/upload/v1709758337/PLANTS/pb_yxwurp.png'></img>
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
                        <div className="modal-row">
                            <h3>First Name:</h3>
                            <div className="input-container">
                                {inputVisibility.firstName ? (
                                    <input type="text" value={formDetails?.firstName} onChange={e => handleChange(e, 'firstName')} className="edit-input"/>
                                    ) : ( <span className="text">{userDetails?.first_name}</span> )}
                                <Button variant="primary" onClick={() => toggleInputVisibility('firstName')}  data-testid="edit-firstName-btn"  className="edit-btn"> 🖊️</Button>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Body>
                        <div className="modal-row">
                            <h3>Last Name:</h3>
                            <div className="input-container">
                                {inputVisibility.lastName ? (
                                    <input type="text" value={formDetails?.lastName} onChange={e => handleChange(e, 'lastName')}   className="edit-input" /> 
                                    ) : ( <span className="text">{userDetails?.last_name}</span> )}
                                    <Button variant="primary" onClick={() => toggleInputVisibility('lastName')}    className="edit-btn">🖊️</Button>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Body>
                        <div className="modal-row">
                            <h3>Username:</h3>
                            <div className="input-container">
                                {inputVisibility.userName ?
                                    <input type="text" value={formDetails?.userName} onChange={e => handleChange(e, 'userName')} className="edit-input"/> :
                                    <span className="text">{userDetails?.username}</span>
                                }
                                <Button variant="primary" onClick={() => toggleInputVisibility('userName')} className="edit-btn">🖊️</Button>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Body>
                        <div className="modal-row">
                            <h3>Email Address:</h3>
                            <div className="input-container">
                                {inputVisibility.email ?
                                    <input type="text" value={formDetails?.email} onChange={e => handleChange(e, 'email')} className="edit-input"/> :
                                    <span className="text">{userDetails?.email}</span>
                                }
                                <Button variant="primary" onClick={() => toggleInputVisibility('email')} className="edit-btn">🖊️</Button>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Body>
                        <div className="modal-row">
                            <h3>Address:</h3>
                            <div className="input-container">
                                {inputVisibility.address ?
                                    <input type="text" value={formDetails?.address} onChange={e => handleChange(e, 'address')} className="edit-input"/> :
                                    <span className="text">{userDetails?.address}</span>
                                }
                                <Button variant="primary" onClick={() => toggleInputVisibility('address')} className="edit-btn">🖊️</Button>
                            </div>
                        </div>
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
