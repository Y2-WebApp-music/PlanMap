import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './navbar.css';
import { auth } from '/src/DB/Firebase-Config.js'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar(){
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);
    const [email, setEmail] = useState(null);
    const [activeLink, setActiveLink] = useState(window.location.pathname);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUsername(user.displayName);
                setEmail(user.email);
                console.log(user.photoURL)
                user.photoURL === null? setUserPhoto('/public/images/user.png'): setUserPhoto(user.photoURL);
            } else {
                setUsername(null);
                setEmail(null);
                setUserPhoto(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPopUpOpen && !event.target.closest('.PopUPSetting')) {
                setPopUpOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopUpOpen]);

    const togglePopUp = () => {
        setPopUpOpen(!isPopUpOpen);
    };

    return(
        <div className="zIndex">
            <div className="NavBar">
                <a href="/" className="HomeLinkTitle">เที่ยวหนายยย</a>
                <div></div>
                <div className="link-btn">
                    <a href="/mainpage" className={activeLink === "/mainpage" ? "active" : ""} >แพลนของฉัน</a>
                    <a href="/createPlan" className={activeLink === "/createPlan" ? "active" : ""} >สร้างแพลนใหม่</a>
                </div>
                <LoginChecker togglePopUp={togglePopUp} username={username} userPhoto={userPhoto} />
            </div>
            {isPopUpOpen && <PopUPSetting username={username} email={email} setPopUpOpen={setPopUpOpen}/>}
        </div>
    )
}

function LoginChecker({togglePopUp, username, userPhoto }){

    const checkLogin = () => {
        if (username != null) {
            return (
                <div className="profileImage" onClick={togglePopUp}>
                    <img src={userPhoto} alt="Profile" />
                    <p>{username}</p>
                </div>
            )
        } else {
            return <a href="/login" className="loginButton">เข้าสู่ระบบ</a>
        }
    };

    return checkLogin();
}

function PopUPSetting({username , email, setPopUpOpen}) {
    const handleLogout = ()=>{
        setPopUpOpen(false)
        signOut(auth)
    }

    return(
        <>
        <div className="PopUPSetting">
            <p className="p-userName">{username}</p>
            <p className="p-email">{email}</p>
            <hr />
            {/* <a className="PopUp-btn" href="/setting">
                <FontAwesomeIcon icon={faGear} size="lg" id="faGear" />
                <p> การตั้งค่า </p>
            </a> */}
            <div className="PopUp-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" id="faRightFromBracket" />
                <p> ออกจากระบบ </p>
            </div>
        </div>
        </>
    )
}

export default Navbar;