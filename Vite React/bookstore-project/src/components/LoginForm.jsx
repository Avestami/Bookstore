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
                UID: UID,
                password: password
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                if (response.data.role === 'admin') {
                    navigate("/adminPanel");
                } else {
                    navigate("/userPanel");
                }
            } else {
                setMessage('Login failed');
            }
        } catch (error) {
            setMessage('Login failed');
        }
    };



    const gotoSignup = async () => {
        navigate("/signup");
    };
    const guestLogin = async () =>{
        navigate("/unregistered")
        //guest user must be assigned a temp id, needs developing
    }


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
                <button onClick={guestLogin}>Login as Guest</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
