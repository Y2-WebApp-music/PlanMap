import React, { useEffect, useState } from "react";
import '../global.css';
import './createplan.css'
import Map from "../components/CreatePlan/Testerfile"
import FormInput from "../components/CreatePlan/FormInput";


function CreatePlan() {
    const [pathway, setPathway] = useState([
        { id: 1, displayName: '', lat: null, lng: null }
    ])
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)
    const [ListLength, setListLength] = useState(pathway.length)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return(
        <>
            <div className="CreatePlan-content">
                <FormInput pathway={pathway} setPathway={setPathway} duration={duration} distance={distance} setListLength={setListLength} ListLength={ListLength}/>
                <Map pathway={pathway} setDuration={setDuration} setDistance={setDistance} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>
            </div>
        </>
    )
}

export default CreatePlan;