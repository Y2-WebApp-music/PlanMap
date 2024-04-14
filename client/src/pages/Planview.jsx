import React, { useEffect, useState } from "react";
import '../global.css';
import '../pages/planview.css'
import MapPlan from "../components/plan/MapPlan"
import PlanDetail from "../components/plan/PlanDetail"
import { useParams } from "react-router-dom";


function PlanView() {
    const { id } = useParams()
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)
    const [pathway, setPathway] = useState([
        { id: 3, displayName: 'centralwOrld', lat: 13.7465337, lng: 100.5391488 },
        { id: 1, displayName: 'King Mongkut’s University of Technology Thonburi (KMUTT)', lat: 13.6512522, lng: 100.4964428 },
        { id: 2, displayName: 'Don Mueang International Airport', lat: 13.9199052, lng: 100.6019304 }
    ])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return(
        <>
            <div className="PlanView-content">
                <PlanDetail pathway={pathway} setPathway={setPathway} duration={duration} distance={distance}/>
                <MapPlan pathway={pathway} setDuration={setDuration} setDistance={setDistance}/>
            </div>
        </>
    )
}

export default PlanView;