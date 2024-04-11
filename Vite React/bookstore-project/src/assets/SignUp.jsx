import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                password
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate("/login");
                // Redirect to login page to confirm authorization
            }
        } catch (error) {
            setMessage('Signup Failed');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" // Change input type to password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;
