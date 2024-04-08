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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUsername(user.displayName);
                setEmail(user.email);
                setUserPhoto(user.photoURL);
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
                    <a href="/mainpage">แพลนของฉัน</a>
                    <a href="/createPlan">สร้างแพลนใหม่</a>
                </div>
                <LoginChecker togglePopUp={togglePopUp} username={username} userPhoto={userPhoto} />
            </div>
            {isPopUpOpen && <PopUPSetting username={username} email={email}/>}
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

function PopUPSetting({username , email}) {
    const navigate = useNavigate();
    const handleSetting = ()=>{
        navigate("/setting")
    }

    return(
        <>
        <div className="PopUPSetting">
            <p className="p-userName">{username}</p>
            <p className="p-email">{email}</p>
            <hr />
            <div className="PopUp-btn" onClick={handleSetting}>
                <FontAwesomeIcon icon={faGear} size="lg" id="icon" />
                <p> การตั้งค่า </p>
            </div>
            <div className="PopUp-btn" onClick={()=>signOut(auth)}>
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" id="icon" />
                <p> ออกจากระบบ </p>
            </div>
        </div>
        </>
    )
}

export default Navbar;