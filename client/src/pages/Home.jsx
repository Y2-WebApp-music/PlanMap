import React from "react";
import './home.css'
import '../global.css'
import Navbar from "../components/Navbar";

function Home(){
    return(
        <>
        <Navbar />
        <div className="MainTitle">
            <h1>เที่ยวหนายยย</h1>
            <h3>เว็บจัดการวางแผนการเดินทาง</h3>
            <a href="/createPlan">เริ่มสร้างแพลน</a>
            <div className="gr-color"> <p></p></div>
        </div>
        < BandageLeft
            Text = "กำหนดเส้นทาง และ คำนวนเวลาเดินทาง"
            subtext = "สามารถกำหนดเส้นทาง สถานที่ระหว่างทาง บอกระยะ และ สามารถคำนวนเวลาเดินทางจากสภาพการจราจร"
            img = {"../public/images/bangkok-map.png"}
        />
        < BandageRight
            Text = "ตรวจสภาพอากาศล่วงหน้า"
            subtext = "สามารถตรวจสอบสภาพอากาศไหด้ล่วงหน้าเพื่อให้แพลนของคุณไม่ล่มโดยง่าย"
            img = {"../public/images/bangkok-map.png"}
        />
        < BandageLeft
            Text = "แนะนำสถานที่ระหว่างทาง"
            subtext = "แนะนำสถานที่ระหว่างทาง ทั้งปั้มนำ้มัน ร้านอาหาร ร้านกาแฟ หรือ โรงแรม"
            img = {"../public/images/bangkok-map.png"}
        />
        </>
    )
}

function BandageLeft({Text,subtext,img}) {
    return(
        <>
        <div className="BandageLeft">
            <div></div>
            <div className="BandageText">
                <h2>{Text}</h2>
                <p>{subtext}</p>
            </div>
            <div className="BandageIMG">
                <img src={img} alt="" />
            </div>
            <div></div>
        </div>
        </>
    )
}

function BandageRight({Text,subtext,img}) {
    return(
        <>
        <div className="BandageRight">
            <div></div>
            <div className="BandageIMG">
                <img src={img} alt="" />
            </div>
            <div className="BandageText">
                <h2>{Text}</h2>
                <p>{subtext}</p>
            </div>
            <div></div>
        </div>
        </>
    )
}

function footer() {}

export default Home;