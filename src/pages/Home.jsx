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
            <input type="button" value="เริ่มสร้างแพลน" />
            <div className="gr-color"> <p></p></div>
        </div>
        <div> <p>textxjkgnb;lxfmnl;xfmgn;lxfgn xfgl;nmxl;fgnm</p></div>
        </>
    )
}

export default Home;