import React, { useContext, useState, useEffect } from "react";
import '/src/global.css'
import './planthumbnail.css'
import { AuthContext } from '/src/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Thumbnail(){
    return(<>
    <div className="PlanThumbnail">
        <div className="FilterArea">
            <div className="searchBox">
                <label htmlFor="search" id="searchLabel">
                    <input type="text" placeholder="ค้นหาแพลน" id="search" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" id="icon" />
                </label>
            </div>
            <div className="BtnZone">
                <FilterBTN text={"ล่าสุด"}/>
                <FilterBTN text={"เก่าที่สุด"}/>
                <FilterBTN text={"เก่าที่สุด"}/>
                <FilterBTN text={"เก่าที่สุด"}/>
                <FilterBTN text={"เก่าที่สุด"}/>
            </div>
        </div>

        <div className="Thumbnail">
            < ThumbnailElement
                title={"Test thumbnail 1"}
                StartDate={"435 345 345"}
                EndDate={"234 235 2235"}
            />
            < ThumbnailElement
                title={"Test thumbnail 1"}
                StartDate={"435 345 345"}
                EndDate={"234 235 2235"}
            />
            < ThumbnailElement
                title={"Test thumbnail 1"}
                StartDate={"435 345 345"}
                EndDate={"234 235 2235"}
            />
            < ThumbnailElement
                title={"Test thumbnail 1"}
                StartDate={"435 345 345"}
                EndDate={"234 235 2235"}
            />
        </div>
    </div>
    </>)
}

function FilterBTN({text}) {
    return(
        <div>
            <input type="submit" value={text} id="FilterBTN" />
        </div>
    )
}

function ThumbnailElement({title, StartDate, EndDate}){
    return(
        <div className="ThumbnailElement">
            <h2>{title}</h2>
            <div className="Date">
                <span>วันที่ </span><span>{StartDate}</span><span> - </span><span>{EndDate}</span>
            </div>
        </div>
    )
}

export default Thumbnail;