import React, { useContext, useState, useEffect } from "react";
import '/src/global.css';
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

function FormInput(){

    return(
        <>
            <div className="sidebar">
                <form action="" className="FormInput">
                    <label htmlFor="titlePlan">
                        <p>ชื่อแพลน</p>
                        <input type="text" name="titlePlan" id="titlePlan" placeholder="ชื่อแพลน"/>
                    </label>

                    <div className="PlanDate">
                        <p>วันที่เดินทาง</p>
                        <div className="calendar-Custom">
                            <input type="date" id="startDate" name="start" placeholder="เริ่มการเดินทาง"/>
                            <p>-</p>
                            <input type="date" id="endDate" name="end" placeholder="สิ้นสุดการเดินทาง"/>
                        </div>
                    </div>

                    <div className="sidebar-CreatePlan-scroll">
                        <div className="sidebar-CreatePlan">
                            <div className="Pathway">
                                <p>สถานที่ในการเดินทาง</p>
                                <div className="Pathway-List">
                                    <div className="TimePrediction">
                                        <span>เวลาโดยประมาณ</span><span id="TimeCurrent"> 2 ชั่วโมง 45 นาที</span><span> ด้วยรถยนต์</span>
                                    </div>
                                    <div htmlFor="" className="Path-Point">
                                        <div className="icon-Path-Point">
                                            <FontAwesomeIcon icon={holdCircle} size="sm" id="holdCircle"/>
                                            <div className="dot-connectPath">
                                                <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                                                <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                                                <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                                            </div>
                                        </div>
                                        <input type="text" placeholder="เลือกจุดหมาย"/>
                                    </div>
                                    <div htmlFor="" className="Path-Destination">
                                        <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
                                        <input type="text" placeholder="เลือกปลายทาง"/>
                                    </div>
                                    <button><FontAwesomeIcon icon={faCirclePlus} size="lg" id="faCirclePlus"/> เพิ่มจุดหมาย</button>
                                </div>
                            </div>

                            <label htmlFor="">
                                <p>บันทึกเพิ่มเติม</p>
                                <textarea name="addition" id="" cols="30" rows="10"></textarea>
                            </label>
                        </div>
                    </div>

                    <input type="submit" value="บันทึกแพลน" id="submit-btn"/>
                </form>
            </div>
        </>
    )
}

export default FormInput;