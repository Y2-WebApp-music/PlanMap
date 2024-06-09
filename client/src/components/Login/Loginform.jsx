import React,{useState} from "react";
import './Loginform.css'
import '/src/global.css'
import { Auth } from "/src/DB/AuthContext.jsx";
import { auth } from '/src/DB/Firebase-Config.js'
import { setSourceMapRange } from "typescript";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {

    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setErr(false);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/mainpage")
        }catch(err){
            setErr('email or password is wrong please try again');
        }
    }

    return(
        <>
        <div className="login">
            <h2>ยินดีต้อนรับ</h2>
            <form className="form-login" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"> อีเมล</label>
                    <a href="/register" id="register">ยังไม่มีบัญชี</a>
                </div>
                <input type="email" id="username" placeholder="email" name="email" onChange={handleInputChange}/>
                <label htmlFor="password" > รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password" name="password" onChange={handleInputChange}/>
                {err && <p className="error-message">{err}</p>}
                <input type="submit" id="submit" value="เข้าสู่ระบบ"/>
            </form>
            <p>หรือ</p>
            <Auth />
        </div>
        </>
    )
}
export default LoginForm;