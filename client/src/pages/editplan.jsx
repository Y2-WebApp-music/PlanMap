import React, { useEffect, useState } from "react";
import '../global.css';
import '../pages/editplan.css'
import Map from "../components/GoogleMap/Testerfile"
import EditForm from "../components/EditPlan/EditForm";
import { auth } from "../DB/Firebase-Config";
import { useParams } from "react-router-dom";
import PlanSkeleton from "../components/Loading/LoadPlan";

function EditPlan() {
    const { id } = useParams()
    const [currentPlan,setCurrentPlan] = useState(null)
    const [pathway, setPathway] = useState([])
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)
    console.log('pathway',pathway)
    useEffect(()=>{
        setListLength(pathway.length)
    },[pathway])
    const [ListLength, setListLength] = useState(pathway.length)
    console.log('currentPlan',currentPlan)
    console.log('Current ListLength:',ListLength)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                try {
                    fetch(`http://localhost:3000/plan?uid=${user.uid}&id=${id}`)
                    .then(response => response.json())
                    .then(planData => {
                        if (planData && planData.Route) {
                            setPathway(planData.Route);
                            setCurrentPlan(planData);
                        }
                    })
                    .catch(error => console.error('Error fetching plan:', error));
                } catch (error) {
                    console.error("Error reading documents:", error);
                    throw error;
                }
            } else {
                return ;
            }
        });
        return () => unsubscribe();
    }, [id]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return(
        <>
            <div className="PlanView-content">
                {currentPlan != null && pathway != null ?(
                    <>
                        <EditForm currentPlan={currentPlan} pathway={pathway} setPathway={setPathway} duration={duration} distance={distance} setListLength={setListLength} ListLength={ListLength}/>
                        <Map pathway={pathway} setDuration={setDuration} setDistance={setDistance} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>
                    </>
                )
                :
                (<PlanSkeleton/>)
                }
            </div>
        </>
    )
}

export default EditPlan;