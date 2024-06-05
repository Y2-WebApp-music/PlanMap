import React, { useEffect, useState } from "react";
import '../global.css';
import '../pages/planview.css'
import MapPlan from "../components/plan/MapPlan"
import PlanDetail from "../components/plan/PlanDetail"
import { auth } from "../DB/Firebase-Config";
import { useParams } from "react-router-dom";
import PlanSkeleton from "../components/Loading/LoadPlan";

function PlanView() {
    const { id } = useParams()
    const [currentPlan,setCurrentPlan] = useState(null)
    const [pathway, setPathway] = useState([])
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)

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
                        <PlanDetail currentPlan={currentPlan} pathway={pathway} duration={duration} distance={distance}/>
                        <MapPlan pathway={pathway} setDuration={setDuration} setDistance={setDistance}/>
                    </>
                )
                :
                (<PlanSkeleton/>)
                }
            </div>
        </>
    )
}

export default PlanView;