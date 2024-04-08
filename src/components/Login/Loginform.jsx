import React,{useState} from "react";
import './Loginform.css'
import '/src/global.css'
import { Auth } from "/src/DB/AuthContext.jsx";
import { auth } from '/src/DB/Firebase-Config.js'
import { setSourceMapRange } from "typescript";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";

function loginform() {

    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/chat")
        }catch(err){setSourceMapRange(true)}
    }

    return(
        <>
        <div className="login">
            <h2>ยินดีต้อนรับ</h2>
            <form className="form-login" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"> ชื่อผู้ใช้</label>
                    <a href="/register" id="register">ยังไม่มีบัญชี</a>
                </div>
                <input type="text" id="username" placeholder="email" name="email"/>
                <label htmlFor="password" > รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password" name="password"/>
                <input type="submit" id="submit" value="เข้าสู่ระบบ"/>
            </form>
            <p>หรือ</p>
            <Auth />
        </div>
        </>
    )
}
export default loginform;