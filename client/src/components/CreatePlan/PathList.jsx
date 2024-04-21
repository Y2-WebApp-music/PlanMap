import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { PathPoint, PathDestination } from "../CreatePlan/Direction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '/src/global.css';
import './FormInput.css'

export default function PathList({pathway, setPathway, duration, distance}){
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    const roundedDistance = distance;
    const [ListLength, setListLength] = useState(pathway.length)

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: '', lat: null, lng: null };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
    };

    console.log('ListLength',ListLength)

    return(
        <div className="Pathway-List">
            <div className="TimePrediction">
                <span>เวลาโดยประมาณ</span><span id="TimeCurrent"> {hours} ชั่วโมง {minutes} นาที</span><span> ด้วยรถยนต์</span>
            </div>
            <Reorder.Group axis="y" values={pathway} onReorder={setPathway}>
                {pathway.map((point, index) => (
                    <Reorder.Item value={point} key={point.id}>
                        {index === ListLength - 1 ? (
                            <PathDestination key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway} setListLength={setListLength} ListLength={ListLength}/>
                        ) : (
                            <PathPoint key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway} setListLength={setListLength} ListLength={ListLength}/>
                        )}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <p className="distance">ระยะทางรวมทั้งสิ้น {roundedDistance} กม.</p>
            <div className="AddPoint" onClick={addPathDestination}><FontAwesomeIcon icon={faCirclePlus} size="lg" id="faCirclePlus"/> เพิ่มจุดหมาย</div>
        </div>
    )
}