import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Reorder } from "framer-motion";
import { auth } from '/src/DB/Firebase-Config.js'
import { useNavigate } from "react-router-dom";
import  loadGoogleMapsScript  from '/src/components/MapLoader.js';

function FormInput({pathway, setPathway, duration, distance}){
    const navigate = useNavigate()
    const [ListLength, setListLength] = useState(pathway.length)
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    const [userId, setUserId] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        StartDate: '',
        EndDate: '',
        Addition: '',
        uid: null,
        Route: []
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
                    Route: []
                }),
                navigate("/mainpage")
            )
        } catch (error) {
            console.error("Error send post:", error);
            throw error;
        }
    };

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: '', lat: null, lng: null };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
    };

    return(
        <>
            <div className="sidebar">
                <form className="FormInput" onSubmit={handleSubmit}>
                    <label htmlFor="titlePlan">
                        <p>ชื่อแพลน</p>
                        <input
                        type="text"
                        name="title"
                        id="titlePlan"
                        placeholder="ชื่อแพลน"
                        value={title}
                        onChange={handleChange}
                    />
                    </label>

                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <input
                                type="date"
                                id="startDate"
                                name="StartDate"
                                value={StartDate}
                                placeholder="เริ่มการเดินทาง"
                                onChange={handleChange}
                            />
                            <p>-</p>
                            <input
                                type="date"
                                id="endDate"
                                name="EndDate"
                                value={EndDate}
                                placeholder="สิ้นสุดการเดินทาง"
                                onChange={handleChange}
                            />
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
                                <textarea
                                name="Addition"
                                id="addition"
                                cols="30"
                                rows="10"
                                value={Addition}
                                onChange={handleChange}
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

async function SearchPlace(id, setPlaceName, pathway, setPathway) {
    const [{ Map }] = await Promise.all([google.maps.importLibrary("places")]);
    const input = document.getElementById(`pathpoint-input-${id}`);
    const autocomplete = new google.maps.places.Autocomplete(input, {
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
}

function PathPoint({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loadGoogleMapsScript().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
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
            <input
                type="text"
                defaultValue={placeName}
                placeholder="เลือกจุดหมาย"
                name="PathPoint"
                id={`pathpoint-input-${id}`}
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}
function PathDestination({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loadGoogleMapsScript().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
    }, [id, setPlaceName]);

    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <input
                type="text"
                defaultValue={placeName}
                placeholder="เลือกจุดหมาย"
                name="PathPoint"
                id={`pathpoint-input-${id}`}
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}

export default FormInput;