import React, { useState, useEffect } from "react";
import '../global.css';
import './Setting.css';
import Navbar from "../components/Navbar";
import { auth } from '/src/DB/Firebase-Config.js'
import { updatePassword } from "firebase/auth";

function Setting(){
    const [currentUser, setCurrentUser] = useState({})
    const [username, setUsername] = useState(currentUser.displayName);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangePass, setIsChangePass] = useState(false);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setUsername(user.displayName)
        });
        return () => unsubscribe();
    }, []);

    const toggleChangePass = () => {
        setIsChangePass(!isChangePass);
    }
    const handleSubmit= async (e)=>{
        if(newPassword === confirmPassword){
        }
        else{
            setNewPassword('')
            setConfirmPassword('')
        }
    }

    console.log(currentUser)
    return(
        <>
            <Navbar/>
            <div className="Setting-Container">
                <h2>แก้ไขโปรไฟล์</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p>{currentUser.email}</p>
                    <p onClick={toggleChangePass}>เปลี่ยนรหัสผ่าน</p>
                    {isChangePass &&
                    <div>
                        <input type="password" placeholder="Old Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                        <input type="password" placeholder="new Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        <input type="password" placeholder="confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    }
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default Setting