import React from "react";
import '../global.css'
import './login.css'
import Navbar from "../components/Navbar";
import LoginForm from "../components/Login/Loginform";

function login() {
    return(
        <>
        <Navbar/>
        <div className="loginflex">
            <div></div>
            <h1>เที่ยวหนายยย</h1>
            <LoginForm />
            <div></div>
        </div>
        </>
    )
}
export default login;