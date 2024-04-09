import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Reorder, useDragControls } from "framer-motion";


function FormInput(){
    const [pathway, setPathway] = useState([
        {id:1, displayName:"testPoint1", lat:21.2346, lng:12.15345},
        {id:2, displayName:"testPoint2", lat:21.2346, lng:12.15345},
        {id:3, displayName:"testPoint3", lat:21.2346, lng:12.15345}
    ])
    const [ListLength, setListLength] = useState(pathway.length)
    const controls = useDragControls()

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: ``, lat: 0, lng: 0 };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
        console.log('ListLength : ',ListLength)
    };

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
                        <div className="sidebar-CreatePlan">
                            <div className="Pathway">
                                <p>สถานที่ในการเดินทาง</p>
                                <div className="Pathway-List">
                                    <div className="TimePrediction">
                                        <span>เวลาโดยประมาณ</span><span id="TimeCurrent"> 2 ชั่วโมง 45 นาที</span><span> ด้วยรถยนต์</span>
                                    </div>
                                    <Reorder.Group axis="y" values={pathway} onReorder={setPathway}>
                                        {pathway.map((pathway, index) => (
                                            <Reorder.Item value={pathway} key={pathway.id}>
                                                {index === ListLength - 1 ? (
                                                    <PathDestination key={pathway.id} displayName={pathway.displayName}/>
                                                ) : (
                                                    <PathPoint key={pathway.id} displayName={pathway.displayName} />
                                                )}
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                    <div className="AddPoint" onClick={addPathDestination}><FontAwesomeIcon icon={faCirclePlus} size="lg" id="faCirclePlus"/> เพิ่มจุดหมาย</div>
                                </div>
                            </div>

                            <label htmlFor="">
                                <p>บันทึกเพิ่มเติม</p>
                                <textarea name="addition" id="" cols="30" rows="10"></textarea>
                            </label>
                        </div>
                    </div>

                    <input type="submit" value="บันทึกแพลน" id="submit-btn"/>
                </form>
            </div>
        </>
    )
}

function PathPoint({ displayName}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
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
            <input type="text" value={placeName} placeholder="เลือกจุดหมาย" name="PathPoint" onChange={(e) => setPlaceName(e.target.value)} />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}
function PathDestination({ displayName}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <input type="text" value={placeName} placeholder="เลือกปลายทาง" onChange={(e) => setPlaceName(e.target.value)} />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}

export default FormInput;