import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import { auth } from '/src/DB/Firebase-Config.js'
import Thumbnail from "../components/Mainpage/PlanThumbnail";
import ComingPlan from "../components/Mainpage/ComingPlan";

function Mainpage(){
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);
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
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return(
        <>
            <div className="mainPage">
                <div className="sideBar">
                    <div className="personalInfo">
                        <img src={userPhoto} alt="Profile" />
                        <h4>{username}</h4>
                        <p>{email}</p>
                    </div>
                    <div className="ComingPlan">
                        <p> แพลนที่จะถึงนี้ </p>
                        <ComingPlan/>
                    </div>
                </div>
                <div className="Thumbnail-container">
                    < Thumbnail />
                </div>
            </div>
        </>
    )
}

export default Mainpage;