import React,{useState} from "react";
import './Registerform.css'
import '/src/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Auth } from "/src/DB/AuthContext.jsx";
import { auth } from '/src/DB/Firebase-Config.js'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setErr(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = "/public/images/user.png"

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName,photoURL });
            navigate("/mainpage");
        } catch (error) {
            const errorMessage = error.message.replace("Firebase: ", "");
            setErr(errorMessage);
        }
    };

    return(
        <>
        <div className="register">
            <BackBTN />
            <h2>สร้างบัญชีผู้ใช้</h2>
            <form className="form-register" onSubmit={handleSubmit}>
                <label htmlFor="email"> อีเมล </label>
                <input type="email" id="email" placeholder="email" name="email" onChange={handleInputChange}/>
                <label htmlFor="username"> ชื่อผู้ใช้</label>
                <input type="text" id="username" placeholder="username" name="username" onChange={handleInputChange}/>
                <label htmlFor="password"> รหัสผ่าน </label>
                <input type="password" id="password" placeholder="password" name="password" onChange={handleInputChange}/>
                {err && <p className="error-message">{err}</p>}
                <input type="submit" id="submit" value="ลงทะเบียน"/>
            </form>
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
export default RegisterForm;