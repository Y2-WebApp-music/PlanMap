import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import Navbar from "../components/Navbar";
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Mainpage(){
    const { authContext } = useContext(AuthContext);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return(
        <>
            <Navbar />
            <div className="mainPage">
                <div className="sideBar">
                    <div className="personalInfo">
                        <img src={"public/images/"+authContext.profileUrl} alt="Profile" />
                        <h4>{authContext.userName}</h4>
                        <p>{authContext.email}</p>
                    </div>
                    <div className="ComingPlan">
                        <p> แพลนที่จะถึงนี้ </p>
                        <div></div>
                    </div>
                </div>
                <div className="content">
                    <p>test</p>
                </div>
            </div>
        </>
    )
}

export default Mainpage;