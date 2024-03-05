import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



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
        <Form className="Login" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Col sm="10">
                <Form.Control type="text" placeholder="Email or username" value={username_email} onChange={handleUsernameEmailChange} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm="10">
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </Col>
        </Form.Group>
        <Button type="submit">Login</Button>
        {loginError && <div>{loginError}</div>}
    </Form>

        );
    };