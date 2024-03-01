import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../services/authentication";


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

        <div className="login-box">
            <h2>Login</h2>
            <form className="content-login" onSubmit={handleSubmit}>
                
                <input
                    className="input"
                    id="username_email"
                    placeholder="Email or Username"
                    type="text"
                    value={username_email}
                    onChange={handleUsernameEmailChange}
                    />

                <input 
                    className="input" 
                    placeholder="Password"  
                    id="password" type="password"  
                    value={password} 
                    onChange={handlePasswordChange}
                    />
        
                {loginError && <div className="invalid-signup" role="invalid-signup">{loginError} </div>}

                <input className="btn btn-login" role="submit-button" id="submit" type="submit" value="Login" />

            </form>
    
        </div>    

        

        </>

    );
};