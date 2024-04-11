import React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../assets/Dashboard.jsx";
import Login from "../assets/LoginForm.jsx";

const AppRouter = () => {
    return(

        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    );

};
export default AppRouter