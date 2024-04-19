import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './mainpage.css';
import { auth } from '/src/DB/Firebase-Config.js'
import Thumbnail from "../components/Mainpage/PlanThumbnail";
import ComingPlan from "../components/Mainpage/ComingPlan";

function Mainpage(){
    const [userInformation, setUserInformation] = useState({
        username: null,
        email: null,
        userPhoto: null
    });

    const [comingPlan, setComingPlan] = useState([]);
    const [route, setRoute] = useState([]);

    const [planList, setPlanList] = useState([]);
    const [planOrder, setPlanOrder] = useState(-1);
    const [clickedButton, setClickedButton] = useState("ล่าสุด");
    const [firstEffectCompleted, setFirstEffectCompleted] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                setUserInformation({
                    username: user.displayName,
                    email: user.email,
                    userPhoto: user.photoURL
                });

                let retryCount = 0;
                const maxRetries = 3;
                const fetchPlan = async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/mainpage?uid=${user.uid}&planOrder=${planOrder}`);
                        const plan = await response.json();
                        if (Object.keys(plan).length === 0 && plan.constructor === Object) {
                            console.log("Plan is empty. Retrying...");
                            retryCount++;
                            if (retryCount <= maxRetries) {
                                setTimeout(fetchPlan, 1000);
                            } else {
                                console.log("Max retries exceeded. Unable to fetch plan.");
                            }
                        } else {
                            setPlanList(plan);
                            setFirstEffectCompleted(true);
                        }
                    } catch (error) {
                        console.error('Error fetching plan:', error);
                        setTimeout(fetchPlan, 1000);
                    }
                };
                fetchPlan();
            } else {
                setUsername(null);
                setEmail(null);
                setUserPhoto(null);
            }
        });
        return () => unsubscribe();
    }, [planOrder]);

    useEffect(() => {
        if (firstEffectCompleted) {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    console.log('http://localhost:3000/comingplan')
                    try {
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
                        })
                        .then(() => setFirstEffectCompleted(false))
                        .catch(error => console.error('Error fetching or parsing plan:', error));
                    } catch (error) {
                        console.error("Error comingplan documents:", error);
                        throw error;
                    }
                } else { return; }
            });
            return () => unsubscribe();
        }
    }, [firstEffectCompleted]);


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

    console.log('userInformation',userInformation)
    console.log('comingPlan',comingPlan)
    console.log('route',route)
    console.log('planList',planList)
    console.log(planList.length != 0)

    return(
        <>
            <div className="mainPage">
                    <>
                        <div className="sideBar">
                            { userInformation.userPhoto != null?(
                                    <div className="personalInfo">
                                    <img src={userInformation.userPhoto} alt="Profile" />
                                    <h4>{userInformation.username}</h4>
                                    <p>{userInformation.email}</p>
                                </div>
                            ):(<> <h1>Loading .... </h1> </>)}
                            <div className="ComingPlan">
                                <p> แพลนที่จะถึงนี้ </p>
                                { comingPlan.length != 0 && route.length != 0 ?(
                                    <ComingPlan comingPlan={comingPlan} ListLength={route.length} route={route} />
                                ):(<> <h1>Loading .... </h1> </>)}
                            </div>
                        </div>
                        <div className="Thumbnail-container">
                            {planList.length != 0 && comingPlan.length != 0 && route.length != 0 ?(
                                < Thumbnail handleOrderSelection={handleOrderSelection} planList={planList} clickedButton={clickedButton}/>
                            ):
                            (<> <h1>Loading .... </h1> </>)}
                        </div>
                    </>
            </div>
        </>
    )
}

export default Mainpage;