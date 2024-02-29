import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await fetch('http://127.0.0.1:5000/user/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username_email: username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("user_id", data.user_id);
            navigate('/http://127.0.0.1:5000/homepage');
        } else {
            setLoginError('Login failed');
        }
        } catch (error) {
        console.error('Error:', error);
        setLoginError('Login failed');
        }
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    return (
        <div className="login-box">
            <h2>Login</h2>
    
            <form className="content-login" onSubmit={handleSubmit}>
                <input className="input" placeholder="Username" id="username" type="text" value={username} onChange={handleUsernameChange}/>
                <input className="input" placeholder="Password"  id="password" type="password"  value={password} onChange={handlePasswordChange}/>
                {loginError && <div className="error-message">{loginError}</div>}
    
                <input className="btn btn-login" role="submit-button" id="submit" type="submit" value="Login" />
            </form>
        </div>    
    );  
};
export default Login;