import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './planDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Reorder } from "framer-motion";
import { loadGoogleMapsScript } from '/src/components/MapLoader.js';

function FormInput({title, start, end, addition, pathway, length, duration, distance}){
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    console.log(length)

    return(
        <>
            <div className="sidebar">
                <div className="PlanDetailView">
                    <div>
                        <p>ชื่อแพลน</p>
                        <p id="titlePlan">{title}</p>
                    </div>
                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <p id="startDate">{start}</p>
                            <p>-</p>
                            <p id="startDate">{end}</p>
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
                                                index === length - 1 ? (
                                                    <PathDestination key={point.id} displayName={point.displayName}/>
                                                ) : (
                                                    <PathPoint key={point.id} displayName={point.displayName}/>
                                                )
                                        ))}
                                </div>
                            </div>
                            <div>
                                <p>บันทึกเพิ่มเติม</p>
                                <p>{addition}</p>
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