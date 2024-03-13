import React from "react";
import '../global.css'
import './navbar.css'

function Navbar(){
    return(
        <>
        <div className="NavBar">
            <p>เที่ยวหนายยย</p>
            <div></div>
            <div className="link-btn">
                <input type="button" value="แพลนของฉัน" />
                <input type="button" value="สร้างแพลนใหม่" />
            </div>
        </div>
        </>
    )
}

export default Navbar;