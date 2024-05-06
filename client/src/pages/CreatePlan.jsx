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
    // const [pathway, setPathway] = useState([
    //     { id: 3, displayName: 'centralwOrld', lat: 13.7465337, lng: 100.5391488 },
    //     { id: 1, displayName: 'King Mongkut’s University of Technology Thonburi (KMUTT)', lat: 13.6512522, lng: 100.4964428 },
    //     { id: 2, displayName: 'Don Mueang International Airport', lat: 13.9199052, lng: 100.6019304 }
    // ])

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