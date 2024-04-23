import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [UID, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name , set_first_name] = useState('')
    const [last_name , set_last_name] = useState('')
    const [city , setCity] = useState('')
    const [address , setAddress] = useState('')
    const [zipcode , setZipcode] = useState('')
    const [district , setDistrict] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                UID,
                password,
                first_name,
                last_name,
                city,
                address,
                zipcode,
                district
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
                    value={UID}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" // Change input type to password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="first name"
                    value={first_name}
                    onChange={(e) => set_first_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="last name"
                    value={last_name}
                    onChange={(e) => set_last_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;
