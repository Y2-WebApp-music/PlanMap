import React, { useEffect, useState } from "react";
import '../global.css';
import './createplan.css'
import Navbar from "../components/Navbar";
import Map from "../components/CreatePlan/Map"
import FormInput from "../components/CreatePlan/FormInput";


function CreatePlan() {

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
            <Navbar/>
            <div className="CreatePlan-content">
                <FormInput pathway={pathway} setPathway={setPathway}/>
                <Map pathway={pathway}/>
            </div>
        </>
    )
}

export default CreatePlan;