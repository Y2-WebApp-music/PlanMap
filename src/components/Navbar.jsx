import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './navbar.css';
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar(){
    const { authContext } = useContext(AuthContext);
    const [isPopUpOpen, setPopUpOpen] = useState(false);

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
                <h1>เที่ยวหนายยย</h1>
                <div></div>
                <div className="link-btn">
                    <input type="button" value="แพลนของฉัน" />
                    <input type="button" value="สร้างแพลนใหม่" />
                </div>
                <LoginChecker togglePopUp={togglePopUp} authContext={authContext} />
            </div>
            {isPopUpOpen && <PopUPSetting authContext={authContext} />}
        </div>
    )
}

function LoginChecker({togglePopUp , authContext }){

    const checkLogin = () => {
        if (authContext.isAuthenticated) {
            return (
                <div className="profileImage" onClick={togglePopUp}>
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

function PopUPSetting({authContext}) {

    return(
        <>
        <div className="PopUPSetting">
            <p className="p-userName">{authContext.userName}</p>
            <p className="p-email">{authContext.email}</p>
            <hr />
            <div className="PopUp-btn">
                <FontAwesomeIcon icon={faGear} size="lg" id="icon" />
                <p> การตั้งค่า </p>
            </div>
            <div className="PopUp-btn">
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" id="icon" />
                <p> ออกจากระบบ </p>
            </div>
        </div>
        </>
    )
}

export default Navbar;