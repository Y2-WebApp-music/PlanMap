import React, { useState } from "react";
import '/src/global.css';
import './planDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function FormInput({currentPlan, pathway, duration, distance}){
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    const navigate = useNavigate()

    console.log('')
    console.log('PlanDetail currentPlan ===>',currentPlan)
    console.log('PlanDetail pathway ===>',pathway)
    console.log('')

    return(
        <>
            <div className="sidebar">
                <div className="PlanDetailView">
                    <div className="btn-planView">
                        <a className="backToMain" href="/mainpage">
                            <FontAwesomeIcon icon={faAngleLeft} size="lg" id="icon" />
                            <p>ย้อนกลับ</p>
                        </a>
                        <button onClick={()=> navigate(`/editplan/${currentPlan._id}`)}>แก้ไขแพลนนี้</button>
                    </div>
                    <div className="Title-Container">
                        <p>ชื่อแพลน</p>
                        <p id="titlePlanView">{currentPlan.title}</p>
                    </div>
                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <p id="startDate">{currentPlan.StartDate}</p>
                            <p>-</p>
                            <p id="startDate">{currentPlan.EndDate}</p>
                        </div>
                    </div>
                    <div className="sidebar-CreatePlan-scroll">
                        <div className="sidebar-CreatePlan">
                            <div className="Pathway">
                                <p>สถานที่ในการเดินทาง</p>
                                <div className="Pathway-List">
                                    <div className="TimePrediction">
                                        <span>เวลาโดยประมาณ</span><span id="TimeCurrent"> {hours} ชั่วโมง {minutes} นาที</span><span> ด้วยรถยนต์</span>
                                    </div>
                                        {pathway.map((point, index) => (
                                                index === pathway.length - 1 ? (
                                                    <PathDestination key={point.id} displayName={point.displayName}/>
                                                ) : (
                                                    <PathPoint key={point.id} displayName={point.displayName}/>
                                                )
                                        ))}
                                </div>
                            </div>
                            <div>
                                <p>บันทึกเพิ่มเติม</p>
                                <p>{currentPlan.Addition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PathPoint({ displayName}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    return(
        <div className="View-Path-Point" >
            <div className="icon-Path-Point">
                <FontAwesomeIcon icon={holdCircle} size="sm" id="holdCircle"/>
                <div className="dot-connectPath">
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                </div>
            </div>
            <p className="View-placeName">{placeName}</p>
        </div>
    )
}
function PathDestination({ displayName}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <p className="View-placeName">{placeName}</p>
        </div>
    )
}

export default FormInput;