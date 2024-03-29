import React, { useContext, useState, useEffect } from "react";
import '/src/global.css';
import './comingPlan.css'
import WeatherAPI from '../WeatherAPI/WeatherAPI'

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
                <div className="Weather">
                    <WeatherAPI
                        place = {"London"}
                    />
                </div>
                <p>เส้นทางการเดินทาง</p>
                <div className="PathWay">
                    <Point
                        Direction ={"Northgate Ratchayothin, 248 Ratchadaphisek Rd, Khwaeng Lat Yao, Khet Chatuchak, Krung Thep Maha Nakhon 10900"}
                    />
                    <Point
                        Direction ={"Path way number 2"}
                    />
                    <Point
                        Direction ={"Path way number 3"}
                    />
                    <Point
                        Direction ={"Path way number 4"}
                    />
                    <Point
                        Direction ={"Path way number 5"}
                    />
                    <Point
                        Direction ={"Path way number 6"}
                    />
                    <Point
                        Direction ={"Path way number 7"}
                    />
                    <Point
                        Direction ={"Path way number 88"}
                    />
                    <Point
                        Direction ={"Path way number 9"}
                    />
                    <Destination
                        Direction ={"Path way number 100"}
                    />
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