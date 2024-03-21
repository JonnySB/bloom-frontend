import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./Login.css"
import Nav from 'react-bootstrap/Nav';
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import logo from "../../assets/bloom-logo.png";

export const Login = () => {
    const [username_email, setUsername_email] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setError] = useState()
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await login(username_email, password);
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.user_id)
        navigate("/");
        } catch (err) {
        console.error(err);
        setError(err.cause)
        navigate("/login");
        }
    };

    const handleUsernameEmailChange = (event) => {
        setUsername_email(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <> 
        <NavbarComponent  />
        <div className="app-container"> 
            <div className="mainLogo">
                    <img alt='logo' src={String(logo)} />
            </div>
            Login / Create an account
            <Container className="d-flex align-items-center justify-content-center">
                <div className="login-container">
                    <Form className="Login d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <h4 className="white-text">I already have an account</h4>
                        <h6 className="white-text">Sign in with your email/username and password</h6>
                        <hr className="white-line" />
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Col sm="12"> 
                                <Form.Control type="text" placeholder="Email or username" value={username_email} onChange={handleUsernameEmailChange} />
                            </Col>
                        </Form.Group>
    
                        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextPassword">
                            <Col sm="12">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            </Col>
                        </Form.Group>
                        <Button variant="success" type="submit">Login</Button>
                        {loginError && <div>{loginError}</div>}
                    </Form>
                  
                </div>
            </Container>
        </div>
    </>

        );
    };


    // <hr className="white-line" />
    // <div className="green-text text-center font-weight-bold">
    // <Nav.Link href="/signup" className="nav-link">Create Account</Nav.Link>
    // </div>