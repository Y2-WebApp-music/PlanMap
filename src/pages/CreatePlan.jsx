import React, { useContext, useState, useEffect } from "react";
import '../global.css';
import './createplan.css'
import Navbar from "../components/Navbar";
import Map from "../components/GoogleMap/Map"
import { AuthContext } from '../AuthContext';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

function CreatePlan() {
    return(
        <>
            <Navbar/>
            <div className="content">
                <FormInput/>
                <Map/>
            </div>
        </>
    )
}

function FormInput(){
    return(
        <>
            <div>
                <input type="text" name="" id="" placeholder="ชื่อแพลน"/>
                <div> <DateRangePicker calendars={1} /> </div>
                <div> weather report </div>
                <div> place direction </div>
                <form action="">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="submit" value="บันทึกแพลน" />
                </form>
            </div>
        </>
    )
}

export default CreatePlan;