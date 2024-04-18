import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import { auth } from '/src/DB/Firebase-Config.js'
import Thumbnail from "../components/Mainpage/PlanThumbnail";
import ComingPlan from "../components/Mainpage/ComingPlan";

function Mainpage(){
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);

    const [comingPlan,setComingPlan] = useState([])
    const [ListLength, setListLength] = useState(null)
    const [route, setRoute] = useState([])

    const [planList,setPlanList] = useState([])
    const [planOrder, setPlanOrder] = useState(-1)
    const [clickedButton, setClickedButton] = useState("ล่าสุด");

    useEffect(() => {
        console.log('fetch(`http://localhost:3000/mainpage`)')
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUsername(user.displayName);
                setEmail(user.email);
                setUserPhoto(user.photoURL);
                fetch(`http://localhost:3000/mainpage?uid=${user.uid}&planOrder=${planOrder}`)
                .then(response => response.json())
                .then(plan => setPlanList(plan))
                .catch(error => console.error('Error fetching plan:', error));

                fetch(`http://localhost:3000/comingplan?uid=${user.uid}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(plan => {
                    setComingPlan(plan);
                    setRoute(plan.Route)
                    setListLength(route.length);
                })
                .catch(error => console.error('Error fetching or parsing plan:', error));
            } else {
                setUsername(null);
                setEmail(null);
                setUserPhoto(null);
            }
        });
        return () => unsubscribe();
    }, [planOrder]);

    useEffect(() => {
        console.log('fetch(`http://localhost:3000/comingplan`)')
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetch(`http://localhost:3000/comingplan?uid=${user.uid}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(plan => {
                    setComingPlan(plan);
                    setListLength(plan.Route.length);
                    setRoute(plan.Route)
                })
                .catch(error => console.error('Error fetching or parsing plan:', error));
            } else { return; }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleOrderSelection = (selectedOrder) => {
        setClickedButton(selectedOrder);
        if (selectedOrder === "ล่าสุด") {
            setPlanOrder(-1);
        } else if (selectedOrder === "เก่าที่สุด") {
            setPlanOrder(1);
        }
    };

    return(
        <>
            <div className="mainPage">
                <div className="sideBar">
                    <div className="personalInfo">
                        <img src={userPhoto} alt="Profile" />
                        <h4>{username}</h4>
                        <p>{email}</p>
                    </div>
                    <div className="ComingPlan">
                        <p> แพลนที่จะถึงนี้ </p>
                        <ComingPlan comingPlan={comingPlan} ListLength={ListLength} route={route} />
                    </div>
                </div>
                <div className="Thumbnail-container">
                    < Thumbnail handleOrderSelection={handleOrderSelection} planList={planList} clickedButton={clickedButton}/>
                </div>
            </div>
        </>
    )
}

export default Mainpage;