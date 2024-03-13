import React from "react";
import '../global.css'
import './navbar.css'

function Navbar(){
    return(
        <>
        <div className="NavBar">
            <h1>เที่ยวหนายยย</h1>
            <div></div>
            <div className="link-btn">
                <input type="button" value="แพลนของฉัน" />
                <input type="button" value="สร้างแพลนใหม่" />
            </div>
            <div className="profile">
                <input type="button" value="เข้าสู่ระบบ" />
            </div>
        </div>
        </>
    )
}

export default Navbar;