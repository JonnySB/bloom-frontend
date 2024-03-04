import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../services/authentication";
import 'bootstrap/dist/css/bootstrap.min.css';



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
        navigate("/homepage");
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
        
        <form className="Login" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            <div className="mb-3">
                
                <input
                    className="form-control"
                    id="username_email"
                    placeholder="Email or Username"
                    type="email"
                    value={username_email}
                    onChange={handleUsernameEmailChange}
                    required autoFocus
                />
            </div>
            <div className="mb-3">
            
                <input
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                {loginError && <div className="invalid-signup" role="invalid-signup">{loginError}</div>}
            </div>
            <button className="btn btn-lg btn-primary btn-block" role="submit-button" id="submit" type="submit">Login</button>
        </form>
</>
        

    );
};