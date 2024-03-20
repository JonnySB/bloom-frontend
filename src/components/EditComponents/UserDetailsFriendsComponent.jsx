import { Container, Nav, Navbar, Card, ListGroup, Button } from 'react-bootstrap';
import "./UserDetails.css"


function UserNavbarFriendsDetails({ userDetails }) {
    return (
        <>
            <Container className='user-details'>
                <div className="profileEdit">
                    <Card>
                    <div className="image-container">
                            <img variant="top" src={userDetails?.avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : userDetails?.avatar_url_string} className='profileAvatar' />
                        </div>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{userDetails?.first_name} {userDetails?.last_name}</ListGroup.Item>
                            <ListGroup.Item>{userDetails?.first_name}</ListGroup.Item>
                            <ListGroup.Item>{userDetails?.first_name}@gmail.com</ListGroup.Item>
                            <ListGroup.Item>test_address5</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                <div className="navbar-container">
                    <div className='potted-image'>
                        <img src='https://res.cloudinary.com/dououppib/image/upload/v1709758337/PLANTS/pb_yxwurp.png'></img>
                    </div>
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Nav className="mr-auto">
                            <Button variant="primary">Send Message</Button>
                        </Nav>
                    </Navbar>
                </div>
            </Container>
        
        </>
    );
}

export default UserNavbarFriendsDetails;
