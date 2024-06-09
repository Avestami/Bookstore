import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./LoginForm.jsx";
import SignUp from "./SignUp.jsx";
import AdminPanel from "./AdminPanel.jsx";
import BookBase from "./Book Base.jsx";
import PurchaseBase from "./Purchase Base.jsx";
import CreditBase from "./Credit Base.jsx";
import {Cancel} from "axios";
import CategoryBase from "./Category Base.jsx";
import UserBase from "./User Base.jsx";
import UserPanel from "./UserPanel.jsx";
import UserProfileSettings from "./User Profile Settings.jsx";
import Cart from "./Cart.jsx";
import CreditUserBase from "./Credit User Base.jsx";
import UnregisteredPanel from "./Unregistered User Panel.jsx";

const AppRouter = () => {
    return(

        <Routes>
                <Route path="/" element={<Login/>} />

                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signout" element={<Login/>}/>

                <Route path="/adminPanel" element={<AdminPanel/>}/>
                <Route path="/bookBase" element={<BookBase/>}/>
                <Route path="/userBase" element={<UserBase/>}/>
                <Route path="/purchaseBase" element={<PurchaseBase/>}/>
                <Route path="/creditBase" element={<CreditBase/>}/>
                <Route path="/categoryBase" element={<CategoryBase/>}/>

                <Route path="/userPanel" element={<UserPanel/>}/>
                <Route path="/creditUserBase" element={<CreditUserBase/>}/>
                <Route path="/userProfileSettings" element={<UserProfileSettings/>}/>
                <Route path="/cart" element={<Cart/>}/>

                <Route path="/unregistered" element={<UnregisteredPanel/>}/>
        </Routes>
    );

};
export default AppRouter