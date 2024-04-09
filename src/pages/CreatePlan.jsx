import React, { useEffect } from "react";
import '../global.css';
import './createplan.css'
import Navbar from "../components/Navbar";
import Map from "../components/CreatePlan/Testerfile"
import FormInput from "../components/CreatePlan/FormInput";


function CreatePlan() {
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
                <FormInput/>
                <Map/>
            </div>
        </>
    )
}

export default CreatePlan;