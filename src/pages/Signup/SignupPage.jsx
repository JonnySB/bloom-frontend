import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import passwordValidator from "password-validator";
import "./SignupPage.css"


export const Signup = () => {
        const [first_name, setFirst_name] = useState("");
        const [last_name, setLast_name] = useState("");
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [isValid, setIsValid] = useState(false);
        const [password_confirm, setPassword_confirm] = useState("");
        const [address, setAddress] = useState("");
    
        const [signUpError, setError] = useState();
        const navigate = useNavigate();
    
        const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(first_name, last_name, username, email, password, password_confirm, address)
            if(validatePassword(password)){
                console.log("redirecting...:");
            navigate("/login");
            } else {
                console.log("Password needs to meet requirements")
                alert("Password not good enough")
            }
    
        } catch (err) {
            console.error(err);
            setError(err.cause)
            navigate("/signup");
        }
        };
    
        const handleFirstNameChange = (event) => {
            setFirst_name(event.target.value);
        };
    
        const handleLastNameChange = (event) => {
            setLast_name(event.target.value);
        };
    
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };

        const validatePassword = (password) => {
            const schema = new passwordValidator();
            schema
              .is()
              .min(8) // Minimum length 8
              .is()
              .max(100) // Maximum length 100
              .has()
              .uppercase() // Must have uppercase letters
              .has()
              .lowercase() // Must have lowercase letters
              .has()
              .digits() // Must have digits
              .has()
              .symbols(); // Must have symbols
            const isValidPassword = schema.validate(password);
            setIsValid(isValidPassword);
        };

        const handlePasswordChange = (event) => {
            const newPassword = event.target.value
            setPassword(newPassword);
            validatePassword(newPassword)
        };

        const handlePasswordConfirmChange = (event) => {
            setPassword_confirm(event.target.value);
        };

        const handleAddressChange = (event) => {
            setAddress(event.target.value);
        };
    

        return (
        
        <>    
            <div className="app-container"> 
        
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="signup-container">
        
            <Form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="white-text">Create Account</h1>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control type="text" placeholder="First name" value={first_name} onChange={handleFirstNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Control type="text" placeholder="Last name" value={last_name} onChange={handleLastNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="username">
                    <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control type="password" placeholder="Confirm password" value={password_confirm} onChange={handlePasswordConfirmChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="address">
                    <Form.Control type="text" placeholder="Home address" value={address} onChange={handleAddressChange} />
                </Form.Group>
    
                <Button variant="success" type="submit">Sign Up</Button>
                {signUpError && <div>{signUpError}</div>}
                {!isValid && (
                  <p className="font-medium text-xs text-red-600 dark:text-green-500">
                    Password must have:
                    <br />
                    - 8 characters minimum
                    <br />
                    - at least one capital letter <br />
                    - at least one number
                    <br />- at least one special character
                  </p>
                )}
                {isValid && (
                  <p className="font-medium text-xs text-green-600 dark:text-green-500">
                    Password is valid!
                  </p>
                )}
            </Form>
            </div>
        
        </Container>
        </div>
        </>
        );
    };