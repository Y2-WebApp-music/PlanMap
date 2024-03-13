import React, { useContext } from "react";
import '../global.css';
import './navbar.css';
import { AuthContext } from '../AuthContext';

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
            <LoginChecker />
            {/* <div className="profile">
                <input type="button" value="เข้าสู่ระบบ" />
            </div> */}
        </div>
        </>
    )
}

function LoginChecker(){
    const { authContext } = useContext(AuthContext);

    const checkLogin = () => {
        if (authContext.isAuthenticated) {
            return (
                <div className="profileImage">
                    <img src={"public/images/"+authContext.profileUrl} alt="Profile" />
                    <p>{authContext.userName}</p>
                </div>
            )
        } else {
            return <input type="submit" value="เข้าสู่ระบบ" id="profile" />;
        }
    };

    return checkLogin();
}

export default Navbar;