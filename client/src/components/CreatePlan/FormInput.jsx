import React, { useState, useEffect } from "react";
import '/src/global.css';
import './FormInput.css'
import PathList from "./PathList";
import { auth } from '/src/DB/Firebase-Config.js'
import { useNavigate } from "react-router-dom";

function FormInput({pathway, setPathway, duration, distance}){
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        StartDate: '',
        EndDate: '',
        Addition: '',
        uid: null,
        Route: [],
        CreateAt : new Date()
    });

    const { title, StartDate, EndDate, Addition } = formData;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
                setFormData({
                    ...formData,
                    uid: user.uid
                });
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, [userId]);
    useEffect(() => {
        setFormData({
            ...formData,
            Route: pathway
        });
        return console.log('formData ==> ',formData);
    }, [pathway]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await fetch(`http://localhost:3000/addPlan?uid=${userId}&document=${formData}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then (
                console.log(" ===> Document added"),
                setFormData({
                    title: '',
                    StartDate: '',
                    EndDate: '',
                    Addition: '',
                    uid: null,
                    Route: [],
                    CreateAt : new Date()
                }),
                navigate("/mainpage")
            )
        } catch (error) {
            console.error("Error send post:", error);
            throw error;
        }
    };


    return(
        <>
            <div className="sidebar">
                <form className="FormInput" onSubmit={handleSubmit}>
                    <label htmlFor="titlePlan">
                        <p>ชื่อแพลน</p>
                        <input type="text" name="title" id="titlePlan" placeholder="ชื่อแพลน" value={title} onChange={handleChange} />
                    </label>

                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <input type="date" id="startDate" name="StartDate" value={StartDate} placeholder="เริ่มการเดินทาง" onChange={handleChange} />
                            <p>-</p>
                            <input type="date" id="endDate" name="EndDate" value={EndDate} placeholder="สิ้นสุดการเดินทาง" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="sidebar-CreatePlan-scroll">
                        <div className="sidebar-CreatePlan">
                            <div className="Pathway">
                                <p>สถานที่ในการเดินทาง</p>
                                < PathList setPathway={setPathway} pathway={pathway} duration={duration} distance={distance}/>
                            </div>

                            <label htmlFor="">
                                <p>บันทึกเพิ่มเติม</p>
                                <textarea name="Addition" id="addition" cols="30" rows="10" value={Addition} onChange={handleChange}
                            />
                            </label>
                        </div>
                    </div>
                    <button type="submit" id="submit-btn" >บันทึกแพลน </button>
                </form>
            </div>
        </>
    )
}
export default FormInput;