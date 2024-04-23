import React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../assets/Dashboard.jsx";
import Login from "../assets/LoginForm.jsx";
import SignUp from "../assets/SignUp.jsx";
import AdminPanel from "../assets/AdminPanel.jsx";

const AppRouter = () => {
    return(

        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/adminPanel" element={<AdminPanel/>}/>
        </Routes>
    );

};
export default AppRouter