
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUserInformationById } from "../../services/authentication";

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const verifyTokenValidity = async () => {
            try {
                if (token) {
                    const userData = await getUserInformationById(token); 
                    setUser(userData);
                    setToken(userData.token);
                    localStorage.setItem("token", userData.token);
                }
            } catch (error) {
                console.error("Error verifying token validity:", error);
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            }
        };

        verifyTokenValidity();
    }, [token]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        navigate("/login");
    };

    const profilePage = () => {
        if (user && user.id) {
            navigate(`/profile/${user.id}`);
        } else {
            navigate("/login");
        }
    };

    const messages = () => {
        navigate("/messages");
    };

    const home = () => {
        navigate("/posts")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={home}>BLOOM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                <Navbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}>
                    <Nav className="me-auto">
                        <Nav.Link onClick={profilePage}>Profile</Nav.Link>
                        <Nav.Link href="#my-plants">My Plants</Nav.Link>
                        <Nav.Link onClick={messages}>Chat</Nav.Link>  
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                        <NavDropdown title="Request" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#my-requests">My Requests</NavDropdown.Item>
                            <NavDropdown.Item href="#received-offers">Received Offers</NavDropdown.Item>
                            <NavDropdown.Item href="#my-offers">My Offers</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;



