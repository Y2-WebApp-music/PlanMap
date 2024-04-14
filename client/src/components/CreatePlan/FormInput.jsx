import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
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
                <form className="FormInput" onSubmit={handleSubmit}>
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
                                        <span>เวลาโดยประมาณ</span><span id="TimeCurrent"> {hours} ชั่วโมง {minutes} นาที</span><span> ด้วยรถยนต์</span>
                                    </div>
                                    <Reorder.Group axis="y" values={pathway} onReorder={setPathway}>
                                        {pathway.map((point, index) => (
                                            <Reorder.Item value={point} key={point.id}>
                                                {index === ListLength - 1 ? (
                                                    <PathDestination key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway}/>
                                                ) : (
                                                    <PathPoint key={point.id} id={point.id} displayName={point.displayName} setPathway={setPathway} pathway={pathway}/>
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

function PathPoint({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    console.log('PathPoint ID: ',id)

    useEffect(() => {
        function SearchPlace(){
            const input = document.getElementById(`pathpoint-input-${id}`);
            const autocomplete = new window.google.maps.places.Autocomplete(input, {
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: false,
            });
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    let newLat = place.geometry.location.lat();
                    let newLng = place.geometry.location.lng();
                    setPlaceName(place.name);
                    let updatedPathway = pathway.map(item =>
                        item.id === id ? { ...item, displayName: place.name, lat: newLat, lng: newLng } : item
                    );
                    setPathway(updatedPathway);
                }
            });
            return () => {
            };
        }
        loadGoogleMapsScript(SearchPlace);
    }, [id, setPlaceName]);

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
            <input type="text" value={placeName} placeholder="เลือกจุดหมาย" name="PathPoint" id={`pathpoint-input-${id}`} onChange={(e) => setPlaceName(e.target.value)} />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}
function PathDestination({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);
    console.log('PathDestination ID:',id)

    useEffect(() => {
        function SearchPlace(){
            const input = document.getElementById(`PathDestination-input-${id}`);
            const autocomplete = new window.google.maps.places.Autocomplete(input, {
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: false,
            });
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    let newLat = place.geometry.location.lat();
                    let newLng = place.geometry.location.lng();
                    setPlaceName(place.name);
                    let updatedPathway = pathway.map(item =>
                        item.id === id ? { ...item, displayName: place.name, lat: newLat, lng: newLng } : item
                    );
                    setPathway(updatedPathway);
                }
            });
            return () => {
            };
        }
        loadGoogleMapsScript(SearchPlace);
    }, [id, setPlaceName]);
    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <input type="text" value={placeName} placeholder="เลือกปลายทาง" id={`PathDestination-input-${id}`} onChange={(e) => setPlaceName(e.target.value)} />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}

export default FormInput;