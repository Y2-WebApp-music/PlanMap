import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import Navbar from "../components/Navbar";
import Thumbnail from "../components/Mainpage/PlanThumbnail";
import ComingPlan from "../components/Mainpage/ComingPlan";
import { AuthContext } from '../AuthContext';

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
                        <ComingPlan
                            title = {"ที่อยู่ไหน I want to wrap a text within "}
                            StartDate = {"23 มี.ค. 2567"}
                            EndDate = {"29 มี.ค. 2567"}
                        />
                    </div>
                </div>
                <div className="content">
                    < Thumbnail />
                </div>
            </div>
        </>
    )
}

export default Mainpage;