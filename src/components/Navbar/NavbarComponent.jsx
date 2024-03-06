import { useNavigate } from "react-router-dom"; 
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


const NavbarComponent = () => {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")
    
    const home = () => {
        navigate("/posts")
    }

    const profilePage = (id) => {
        if (id) {
        navigate(`/profile/${id}`);
        } else {
        navigate('/login')
        }

    };

    const myplants = (id) => {
        if (id) {
        navigate("/plants");
        } else {
        navigate('/login')
        }
    }
    const messages = (id) => {
        if (id) { 
        navigate(`/messages/${id}`);
        } else {
        navigate('/login')
        }
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        navigate("/login");
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={home}>BLOOM</Navbar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link onClick={profilePage}>Profile</Nav.Link>
                        <Nav.Link onClick={myplants}>My Plants</Nav.Link>  
                        <Nav.Link onClick={messages}>Chat</Nav.Link>  
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
            
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;



