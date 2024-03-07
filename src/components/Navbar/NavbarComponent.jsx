import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import "./NavbarComponent.css";


const NavbarComponent = () => {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")

    const home = () => {
        navigate("/")
    }

    const profilePage = () => {
        if (id) {
            navigate(`/profile`);
        } else {
            navigate('/login')
        }

    };

    const requestManagement = (id) => {
        if (id) {
            navigate(`/create_request`);
        } else {
            navigate('/login')
        }

    };

    const myplants = (id) => {
        if (id) {
            navigate("/myplants");
        } else {
            navigate('/login')
        }
    }
    const messages = (id) => {
        if (id) {
            navigate(`/messages`);
        } else {
            navigate('/login')
        }
    };

    const logout = () => {
        if (id) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user_id");
            navigate("/");
            window.location.reload()
        } else {
            navigate("/login");
        }
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand onClick={home}>BLOOM</Navbar.Brand>
                <Nav className="me-auto">
                    {token && (
                        <>
                            <Nav.Link onClick={profilePage}>Profile</Nav.Link>
                            <Nav.Link onClick={requestManagement}>Request Management</Nav.Link>
                            <Nav.Link onClick={myplants}>My Plants</Nav.Link>
                            <Nav.Link onClick={messages}>Chat</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </>
                    )}
                    {!token && (
                        <>
                            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;



