
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { getUserInformationById } from "../../services/authentication";

const NavbarComponent = () => {
    // const [isOpen, setIsOpen] = useState(false);
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

    // const toggleNavbar = () => {
    //     setIsOpen(!isOpen);
    // };

    const home = () => {
        navigate("/posts")
    }

    const profilePage = () => {
        if (user && user.id) {
            navigate(`/profile/${user.id}`);
        } else {
            navigate("/login");
        }
    };

    const myplants = () => {
        navigate(`/plants/user/${user.id}`);
    }

    const messages = () => {
        navigate("/messages");
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
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                <Navbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}> */}
                    <Nav className="me-auto">
                        <Nav.Link onClick={profilePage}>Profile</Nav.Link>
                        <Nav.Link onClick={myplants}>My Plants</Nav.Link>  
                        <Nav.Link onClick={messages}>Chat</Nav.Link>  
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                {/* </Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;



