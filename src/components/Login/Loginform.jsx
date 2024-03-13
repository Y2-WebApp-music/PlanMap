import React from "react";
import './Loginform.css'
import '/src/global.css'

function loginform() {
    return(
        <>
        <div className="login">
            <h2>ยินดีต้อนรับ</h2>
            <form action="" className="form-login">
                <div>
                    <label htmlFor="username"> ชื่อผู้ใช้</label>
                    <a href="" id="register">ยังไม่มีบัญชี</a>
                </div>
                <input type="text" id="username" placeholder="username" />
                <label htmlFor="password"> รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password"/>
                <input type="submit" id="submit" value="เข้าสู่ระบบ"/>
            </form>
            <p>หรือ</p>
            <div className="googleLogin">
                <img src="public/icons/icon-google.svg" alt="" />
                <p>เข้าสู่ระบบด้วย Google</p>
            </div>
        </div>
        </>
    )
}
export default loginform;