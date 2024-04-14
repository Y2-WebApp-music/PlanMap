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
    const [plan, setPlan] = useState(null)
    const [duration,setDuration] = useState(null)
    const [distance,setDistance] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
                fetch(`http://localhost:3000/plan?uid=${user.uid}&id=${id}`)
                    .then(response => response.json())
                    .then(planData => {
                        setPlan(planData);
                        if (planData && planData.Route) {
                            setPathway(planData.Route);
                        }
                    })
                    .catch(error => console.error('Error fetching plan:', error));
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, [id]);

    console.log('fetch plan ==> ',plan)
    console.log('fetch pathway ==> ',pathway)
    console.log('fetch pathway ==> ',pathway[0])

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
            <div className="PlanView-content">
                <PlanDetail pathway={pathway} setPathway={setPathway} duration={duration} distance={distance}/>
                <MapPlan pathway={pathway} setDuration={setDuration} setDistance={setDistance}/>
            </div>
        </>
    )
}

export default PlanView;