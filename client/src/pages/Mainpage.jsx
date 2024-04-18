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
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log('http://localhost:3000/mainpage')
                setUserInformation(prevState => ({
                    ...prevState,
                    username: user.displayName,
                    email:user.email,
                    userPhoto:user.photoURL
                }));
                try {
                    fetch(`http://localhost:3000/mainpage?uid=${user.uid}&planOrder=${planOrder}`)
                    .then(response => response.json())
                    .then(plan => setPlanList(plan))
                    .then(() => setFirstEffectCompleted(true))
                    .catch(error => console.error('Error fetching plan:', error));
                } catch (error) {
                    console.error("Error mainpage documents:", error);
                    throw error;
                }
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
    // console.log('route',route.length)
    console.log('planList',planList)

    return(
        <>
            <div className="mainPage">
                <div className="sideBar">
                    <div className="personalInfo">
                        <img src={userInformation.userPhoto} alt="Profile" />
                        <h4>{userInformation.username}</h4>
                        <p>{userInformation.email}</p>
                    </div>
                    <div className="ComingPlan">
                        <p> แพลนที่จะถึงนี้ </p>
                        <ComingPlan comingPlan={comingPlan} ListLength={route.length} route={route} />
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