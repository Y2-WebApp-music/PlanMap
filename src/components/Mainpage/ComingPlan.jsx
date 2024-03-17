import React, { useContext, useState, useEffect } from "react";
import '/src/global.css';
import './comingPlan.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons'

function ComingPlan({title, StartDate, EndDate}){
    return(
        <div className="NowPlan">
            <div className="NowPlan-title"> <h2>{title}</h2> </div>
            <div className="Date">
                <span>วันที่ </span><span>{StartDate}</span><span> - </span><span>{EndDate}</span>
            </div>
            <div className="scrollDetail">
                <p>สภาพอากาศล่วงหน้า</p>
                <div className="Weather"> weather report here</div>
                <p>เส้นทางการเดินทาง</p>
                <div className="PathWay">
                    <Point
                        Direction ={"Path way number 1"}
                    />
                </div>
            </div>
            <input type="submit" value="ดูแพลน" />
        </div>
    )
}

function Point({Direction}){
    return(
        <div>{Direction}</div>
    )
}

export default ComingPlan;