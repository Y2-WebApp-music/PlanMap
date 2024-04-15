import React, { useEffect, useState } from "react";
import '../global.css';
import '../pages/planview.css'
import MapPlan from "../components/plan/MapPlan"
import PlanDetail from "../components/plan/PlanDetail"
import { auth } from "../DB/Firebase-Config";
import { useParams } from "react-router-dom";


function PlanView() {
    const { id } = useParams()
    const [userId,setUserId] = useState(null)
    const [pathway, setPathway] = useState([])
    const [ListLength, setListLength] = useState(null)
    const [title, setTitle] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [addi, setAddi] = useState(null)
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
                fetch(`http://localhost:3000/plan?uid=${user.uid}&id=${id}`)
                    .then(response => response.json())
                    .then(planData => {
                        setTitle(planData.title);
                        setStart(planData.StartDate);
                        setEnd(planData.EndDate);
                        setAddi(planData.Addition);
                        if (planData && planData.Route) {
                            setPathway(planData.Route);
                            setListLength(planData.Route.length);
                        }
                    })
                    .catch(error => console.error('Error fetching plan:', error));
            } else {
                setUserId(null);
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

    // if (plan === null) {
    //     return null;
    // }
    return(
        <>
            <div className="PlanView-content">
                <PlanDetail title={title} start={start} end={end} addition={addi} pathway={pathway} length={ListLength} duration={duration} distance={distance}/>
                <MapPlan pathway={pathway} setDuration={setDuration} setDistance={setDistance}/>
            </div>
        </>
    )
}

export default PlanView;