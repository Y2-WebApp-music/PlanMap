import React from "react";
import './Registerform.css'
import '/src/global.css'

function registerForm() {
    return(
        <>
        <div className="register">
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
export default registerForm;