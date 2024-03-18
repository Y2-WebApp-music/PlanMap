import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './createplan.css'
import Navbar from "../components/Navbar";
import Map from "../components/GoogleMap/Map"
import WeatherAPI from '/src/components/WeatherAPI/WeatherAPI.jsx'


function CreatePlan() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return(
        <>
            <Navbar/>
            <div className="CreatePlan-content">
                <FormInput/>
                <Map/>
            </div>
        </>
    )
}

function FormInput(){

    return(
        <>
            <div className="sidebar">
                <form action="" className="FormInput">
                    <label htmlFor="titlePlan">
                        <p>ชื่อแพลน</p>
                        <input type="text" name="titlePlan" id="titlePlan" placeholder="ชื่อแพลน"/>
                    </label>

                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <input type="date" id="startDate" name="start" placeholder="เริ่มการเดินทาง"/>
                            <p>-</p>
                            <input type="date" id="endDate" name="end" placeholder="สิ้นสุดการเดินทาง"/>
                        </div>
                    </div>

                    <div className="sidebar-CreatePlan-scroll">
                        <div>
                            <p>สภาพอากาศล่วงหน้า</p>
                            <div className="weather">
                                <WeatherAPI
                                    place = {"London"}
                                />
                            </div>
                        </div>

                        <div className="Pathway">
                            <p>สถานที่ในการเดินทาง</p>
                            <p>zdfknlbnzdfklbn</p>
                        </div>

                        <label htmlFor="">
                            <p>บันทึกเพิ่มเติม</p>
                            <textarea name="addition" id="" cols="30" rows="10"></textarea>
                        </label>
                    </div>

                    <input type="submit" value="บันทึกแพลน" id="submit-btn"/>
                </form>
            </div>
        </>
    )
}

export default CreatePlan;