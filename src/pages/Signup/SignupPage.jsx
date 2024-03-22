import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signup } from "../../services/authentication";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import passwordValidator from "password-validator";
import "./SignupPage.css"
import NavbarComponent from '../../components/Navbar/NavbarComponent.jsx';
import logo from "../../assets/bloom-logo.png";

export const Signup = () => {
        const [first_name, setFirst_name] = useState("");
        const [last_name, setLast_name] = useState("");
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [passwordIsValid, setPasswordIsValid] = useState(true);
        const [password_confirm, setPassword_confirm] = useState("");
        const [address, setAddress] = useState("");
        const location = useLocation();
        const [emailError, setEmailError] = useState();
        const [userNameError, setuserNameError] = useState()
        const navigate = useNavigate();
    
        const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(first_name, last_name, username, email, password, password_confirm, address)
            console.log("redirecting...:");
            navigate("/login");
    
        } 
        catch (err) {
                if (err.message == "Bad request - user not created. This username has already been taken.") {
                    setuserNameError(err.message)
                } else if (err.message == "Bad request - user not created. This email has already been taken.") {
                    setEmailError(err.message)
                }
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
              .is().min(8) // Minimum length 8
              .is().max(100) // Maximum length 100
              .has().uppercase() // Must have uppercase letters
              .has().lowercase() // Must have lowercase letters
              .has().digits() // Must have digits
              .has().symbols(); // Must have symbols
   
            const isValidPassword = schema.validate(password, { details: true });
            setPasswordIsValid(isValidPassword);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
   
        };

        const handlePasswordConfirmChange = (event) => {
            let confirm_password = event.target.value
            validatePassword(confirm_password)
            setPassword_confirm(event.target.value);
        };

        const handleAddressChange = (event) => {
            setAddress(event.target.value);
        };

        const loginPage = () => {
            navigate(`/login`);
            
        }
    
        const signupPage = () => {
            navigate(`/signup`);
            
        }

        return (      
        <>   
            <NavbarComponent  />
            <div className="app-container"> 
            <div className="mainLogo">
                    <img alt='logo' src={String(logo)} />
            </div>
            <div className="ItemsToNavigate">
                    <button type="button" 
                            className={`itemstoNavigateButton ${location.pathname === '/login' ? 'active-nav-item' : ''}`} 
                            onClick={loginPage}>
                        Login
                    </button>
                    <button type="button" 
                            className={`itemstoNavigateButton ${location.pathname === '/signup' ? 'active-nav-item' : ''}`} 
                            onClick={signupPage}>
                        Create an account
                    </button>
            </div>
            <Container className="d-flex align-items-center justify-content-center">
            <div className="signup-container">
            <Form className="signup-form" onSubmit={handleSubmit}>
                        <h4 className="white-text">I do not have an account</h4>
                        <h6 className="white-text">Please fill out the bewlo information to start with us</h6>
                        <hr className="white-line" />
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control required type="text" placeholder="First name" value={first_name} onChange={handleFirstNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Control   required type="text" placeholder="Last name" value={last_name} onChange={handleLastNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="username">
                    <Form.Control   required  type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </Form.Group>
                    {userNameError && <div className="emailError">{userNameError.slice(32)}</div>}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control   required type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </Form.Group>
                    {emailError && <div className="emailError">{emailError.slice(32)}</div>}
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control   required type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control   required type="password" placeholder="Confirm password" value={password_confirm} onChange={handlePasswordConfirmChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="address">
                    <Form.Control   required type="text" placeholder="Home address" value={address} onChange={handleAddressChange} />
                </Form.Group>
    
                <Button variant="success" type="submit">Sign Up</Button>
                {passwordIsValid && passwordIsValid.length > 0 && <div className="signUpFormErros">
                {passwordIsValid.map((item, index) => (
                    <div key={index}>{item.message}</div>
                ))}
                </div>}
            </Form>
            </div>
        
        </Container>
        </div>
        </>
        );
    };