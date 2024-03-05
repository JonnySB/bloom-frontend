import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./UserDetails.css"

function UserNavbar({ userDetails }) {
  return (
    <Container className='user-details'>
        <Card style={{ width: '18rem' }} className='profileEdit'>
            <Card.Img variant="top" src={userDetails?.avatar_url_string}/>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{userDetails?.first_name} {userDetails?.last_name}</ListGroup.Item>
                <ListGroup.Item>{userDetails?.email}</ListGroup.Item>
                <ListGroup.Item>{userDetails?.address}</ListGroup.Item>
            </ListGroup>
        </Card>
        <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Manage Request</Nav.Link>
                    <Nav.Link href="#link">Edit Profile</Nav.Link>
                    <Nav.Link href="#link">Settings</Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    </Container>
  );
}

export default UserNavbar;