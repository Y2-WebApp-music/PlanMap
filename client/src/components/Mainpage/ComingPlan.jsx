import React, { useContext, useState, useEffect } from "react";
import '/src/global.css';
import './comingPlan.css'
import WeatherAPI from '../WeatherAPI/WeatherAPI'
import { auth } from '/src/DB/Firebase-Config.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons'

function ComingPlan({comingPlan, ListLength, route }){

    return(
        <div className="NowPlan">
            <div className="NowPlan-title"> <h2>{comingPlan.title}</h2> </div>
            <div className="Date">
                <span>วันที่ </span><span>{comingPlan.StartDate}</span><span> - </span><span>{comingPlan.EndDate}</span>
            </div>
            <div className="scrollDetail">
                <p>สภาพอากาศล่วงหน้า</p>
                <div className="Weather">
                    <WeatherAPI
                        place = {"London"}
                    />
                </div>
                <p>เส้นทางการเดินทาง</p>
                <div className="PathWay">
                    {route.map((route, index) => (
                        index === ListLength - 1 ? (
                            <Destination key={route.id} Direction={route.displayName}/>
                                ) : (
                            <Point key={route.id} Direction={route.displayName}/>
                            )
                        ))}
                </div>
            </div>
            <input type="submit" value="ดูแพลน" />
        </div>
    )
}

function Point({Direction}){
    return(
        <div className="Point">
            <div className="Circle-Point">
                <FontAwesomeIcon icon={regularCircle} size="lg" style={{color : 'var(--color-subtext)'}}/>
                <div className="dot-connect">
                    <FontAwesomeIcon icon={solidCircle} size="2xs" style={{color : 'var(--color-subtext)'}}/>
                    <FontAwesomeIcon icon={solidCircle} size="2xs" style={{color : 'var(--color-subtext)'}}/>
                    <FontAwesomeIcon icon={solidCircle} size="2xs" style={{color : 'var(--color-subtext)'}}/>
                </div>
            </div>
            <div className="Direction">
                <p>{Direction}</p>
            </div>
        </div>
    )
}
function Destination({Direction}){
    return(
        <div className="Point">
            <div className="Circle-Point">
                <FontAwesomeIcon icon={faLocationDot} size="xl" style={{color : 'var(--color-red)'}}/>
            </div>
            <div className="Direction">
                <p>{Direction}</p>
            </div>
        </div>
    )
}

export default ComingPlan;