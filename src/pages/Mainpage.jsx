import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import Navbar from "../components/Navbar";
import Thumbnail from "../components/Mainpage/PlanThumbnail";
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
                        <NowPlan
                            title = {"โอ้นุ่นดเสทิืยดเินยนทปาดเทืะูอยู่ที่ไหน้นั้นjkldfbkzd;fbl;zสผวก้ิสดเิสวปดเทืสวดผเื"}
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

function NowPlan({title, StartDate, EndDate}){
    return(
        <div className="NowPlan">
            <h2>{title}</h2>
            <div className="Date">
                <span>วันที่ </span><span>{StartDate}</span><span> - </span><span>{EndDate}</span>
            </div>
            <p>สภาพอากาศล่วงหน้า</p>
            <div className="Weather"> weather report here</div>
            <p>เส้นทางการเดินทาง</p>
            <div className="PathWay"> Path ways Here </div>
            <input type="submit" value="ดูแพลน" />
        </div>
    )
}

export default Mainpage;