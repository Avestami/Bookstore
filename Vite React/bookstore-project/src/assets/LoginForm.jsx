import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [UID, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                UID,
                password
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            setMessage('Login failed');
        }
    };

    const gotoSignup = async () => {
        navigate("/signup");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={UID}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <button onClick={gotoSignup}>Sign up</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
