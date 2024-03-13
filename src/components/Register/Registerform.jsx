import React from "react";
import './Registerform.css'
import '/src/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function registerForm() {
    return(
        <>
        <div className="register">
            <BackBTN link={""}/>
            <h2>สร้างบัญชีผู้ใช้</h2>
            <form action="" className="form-register">
                <label htmlFor="email"> อีเมล </label>
                <input type="text" id="email" placeholder="email" />
                <label htmlFor="username"> ชื่อผู้ใช้</label>
                <input type="text" id="username" placeholder="username" />
                <label htmlFor="password"> รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password"/>
                <label htmlFor="ConPassword"> ยืนยันรหัสผ่าน </label>
                <input type="password" id="ConPassword" placeholder="confirm password"/>
                <input type="submit" id="submit" value="ลงทะเบียน"/>
            </form>
        </div>
        </>
    )
}

function BackBTN(link) {
    return (
        <>
        <a className="back" href={link}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" id="icon" />
            <p>ย้อนกลับ</p>
        </a>
        </>
    )
}
export default registerForm;