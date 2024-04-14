import React,{useState} from "react";
import './Registerform.css'
import '/src/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Auth } from "/src/DB/AuthContext.jsx";
import { auth } from '/src/DB/Firebase-Config.js'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function registerForm() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName });
            navigate("/mainpage");
        } catch (error) {
            console.error('Registration error:', error);
            setErr(true);
        }
    };

    return(
        <>
        <div className="register">
            <BackBTN />
            <h2>สร้างบัญชีผู้ใช้</h2>
            <form className="form-register" onSubmit={handleSubmit}>
                <label htmlFor="email"> อีเมล </label>
                <input type="text" id="email" placeholder="email" name="email"/>
                <label htmlFor="username"> ชื่อผู้ใช้</label>
                <input type="text" id="username" placeholder="username" name="username"/>
                <label htmlFor="password"> รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password" name="password"/>
                <input type="submit" id="submit" value="ลงทะเบียน"/>
            </form>
            {err && <span>Something wrong please try again</span>}
            <Auth />
        </div>
        </>
    )
}

function BackBTN() {
    return (
        <>
        <a className="back" href="/login">
            <FontAwesomeIcon icon={faAngleLeft} size="lg" id="icon" />
            <p>ย้อนกลับ</p>
        </a>
        </>
    )
}
export default registerForm;