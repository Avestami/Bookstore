import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    const bookBase = async () => {
        navigate("/bookBase");
    };
    const userBase = async () => {
        navigate("/userBase");
    };
    const purchaseBase = async () => {
        navigate("/purchaseBase");
    };
    const creditBase = async () => {
        navigate("/creditBase");
    };
    const categoryBase = async () => {
        navigate("/categoryBase");
    };
    const loginForm = async () => {
        navigate("/login");
    };
    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={userBase}>UserBase</button>
            <button onClick={purchaseBase}>PurchaseBase</button>
            <button onClick={creditBase}>CreditBase</button>
            <button onClick={categoryBase}>CategoryBase</button>
            <button onClick={bookBase}>BookBase</button>
            <button onClick={loginForm}>Sign out</button>
        </div>

    )
};

export default AdminPanel;
