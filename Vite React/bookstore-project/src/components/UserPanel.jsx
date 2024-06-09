import React from 'react';
import {useNavigate} from "react-router-dom";
import userProfileSettings from "./User Profile Settings.jsx";

const UserPanel = () => {
    const navigate = useNavigate();



    const creditBase = async () => {
        navigate("/creditUserBase");
    };
    const userProfileSettings = async () => {
        navigate("/userProfileSettings");
    };
    const logout = async() => {
        navigate("/login");
    };

    const cart = async() => {
        navigate("/Cart");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="userPanel-content">

                <p>Welcome to your Panel!</p>

                <button onClick={creditBase}>My Credit Cards</button>
                <button onClick={cart}>My Cart</button>
                <button onClick={userProfileSettings}>Profile Settings</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default UserPanel;