import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './planDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Reorder } from "framer-motion";
import { loadGoogleMapsScript } from '/src/components/MapLoader.js';

function FormInput({pathway, setPathway, duration, distance}){
    const [ListLength, setListLength] = useState(pathway.length)
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: '', lat: null, lng: null };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
    };

    const handleSubmit = async (e)=>{
        console.log(e.target.value)
    }

    return(
        <>
            <div className="sidebar">
                    <label htmlFor="titlePlan">
                        <p>ชื่อแพลน</p>
                        <p id="titlePlan"> tes</p>
                    </label>

                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <p id="startDate"> 34-124-214</p>
                            {/* <input type="date" id="startDate" name="start" value={"2018-07-22"} placeholder="เริ่มการเดินทาง"/> */}
                            <p>-</p>
                            <p id="startDate"> 34-124-214</p>
                            {/* <input type="date" id="endDate" name="end" placeholder="สิ้นสุดการเดินทาง"/> */}
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
                                                index === ListLength - 1 ? (
                                                    <PathDestination key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway}/>
                                                ) : (
                                                    <PathPoint key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway}/>
                                                )
                                        ))}
                                </div>
                            </div>

                            <label htmlFor="">
                                <p>บันทึกเพิ่มเติม</p>
                                <textarea name="addition" id="" cols="30" rows="10"></textarea>
                            </label>
                        </div>
                    </div>
            </div>
        </>
    )
}

function PathPoint({id, displayName}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    console.log('PathPoint ID: ',id)

    return(
        <div className="Path-Point" >
            <div className="icon-Path-Point">
                <FontAwesomeIcon icon={holdCircle} size="sm" id="holdCircle"/>
                <div className="dot-connectPath">
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                </div>
            </div>
            <p>{placeName}</p>
        </div>
    )
}
function PathDestination({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <p>{placeName}</p>
        </div>
    )
}

export default FormInput;