import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./LoginPage.css"

export const Login = () => {
    const [username_email, setUsername_email] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setError] = useState()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const token = await login(username_email, password);
        window.localStorage.setItem("token", token);
        navigate("/posts");
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
        <Container fluid className="drip-container">
                <Form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Col sm="10">
                    <Form.Control 
                        className="input-field" 
                        type="text" 
                        placeholder="Email or username" 
                        value={username_email} 
                        onChange={handleUsernameEmailChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm="10">
                    <Form.Control 
                        className="input-field" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={handlePasswordChange} />
                    </Col>
                </Form.Group>
                <Button className="login-button" type="submit">Login</Button>
                {loginError && <div className="error-message">{loginError}</div>}
                </Form>
      </Container>
        );
    };