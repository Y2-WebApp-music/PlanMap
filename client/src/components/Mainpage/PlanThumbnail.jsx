import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '/src/global.css'
import './planthumbnail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatThaiDate } from "../DateFormat";

function Thumbnail({uid, handleOrderSelection, planList, clickedButton, setPlanList }){
    const [searchQuery, setSearchQuery] = useState('');
    const [searching,setSearching] = useState(false)

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        if (searching === true){
            if (event.target.value === '') {
                fetchPlan()
                setSearching(false)
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch()
        }
    };

    const handleSearch = async(e)=>{
        setSearching(true)
        try {
            await fetch(`http://localhost:3000/search?uid=${uid}&string=${searchQuery}`, {
                method: 'POST'
            }).then(response => response.json())
            .then(data => setPlanList(data))
            .catch(error => console.error('Error fetching search results:', error));
        } catch (error) {
            console.error("Error send post:", error);
            throw error;
        }
    }

    const fetchPlan = async () => {
        try {
            const response = await fetch(`http://localhost:3000/mainpage?uid=${uid}&planOrder=-1`);
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
            }
        } catch (error) {
            console.error('Error fetching plan:', error);
            setTimeout(fetchPlan, 1000);
        }
    };

    return(<>
    <div className="PlanThumbnail">
        <div className="FilterArea">
            <div className="searchBox">
                <label htmlFor="search" id="searchLabel">
                    <input type="text" placeholder="ค้นหาแพลน" id="search" value={searchQuery} onChange={handleSearchInputChange} onKeyDown={handleKeyDown}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" id="searchIconPlan" onClick={handleSearch}/>
                </label>
            </div>
            <div className="BtnZone">
                <FilterBTN text={"ล่าสุด"} onClick={handleOrderSelection} clicked={clickedButton === "ล่าสุด"} />
                <FilterBTN text={"เก่าที่สุด"} onClick={handleOrderSelection} clicked={clickedButton === "เก่าที่สุด"} />
            </div>
        </div>

        <div className="Thumbnail-scroll">
            <div className="Thumbnail">
                {planList.map((planList, index)=>(
                    <ThumbnailElement key={index} id={planList._id} Title={planList.title} StartDate={planList.StartDate} EndDate={planList.EndDate} From={planList.Route[0].displayName} To={planList.Route[planList.Route.length - 1].displayName} uid={uid} />
                ))}
            </div>
        </div>
    </div>
    </>)
}

function FilterBTN({ text, onClick, clicked }) {
    return (
        <div>
            <button id="FilterBTN" className={clicked ? 'clicked' : ''} onClick={() => onClick(text)}>{text}</button>
        </div>
    );
}

function ThumbnailElement({id, Title, StartDate, EndDate, From, To, uid}){
    const [showPopup, setShowPopup] = useState(false);
    const [deletePlan, setDeletePlan] = useState(false)
    const start = formatThaiDate(StartDate);
    const end = formatThaiDate(EndDate);
    const navigate = useNavigate()
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return(
        <div className="ThumbnailElement">
            <div className="grid-Thumbnail">
                <div className="Thumbnail-content">
                    <h2>{Title}</h2>
                    <div className="Date">
                        <span>วันที่ </span><span>{start}</span><span> - </span><span>{end}</span>
                    </div>
                    <div className="Thumbnail-where"><span>จาก : </span><span>{From}</span></div>
                    <div className="Thumbnail-where"><span>ถึง : </span><span>{To}</span></div>
                </div>
                <div className="Plan-setting">
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" id="settingPlan-btn" onClick={togglePopup}/>
                    {showPopup && ( <PlanSetting showPopup={showPopup} setShowPopup={setShowPopup} id={id} setDeletePlan={setDeletePlan}/>)}
                </div>
            </div>
            <div className="goToPlan">
                <button id="seePlan" onClick={()=> navigate(`/plan/${id}`)}>ดูแพลน</button>
            </div>
            {deletePlan && (<DeletePopUp uid={uid} id={id} setDeletePlan={setDeletePlan}/>)}
        </div>
    )
}

function PlanSetting({id, showPopup, setShowPopup, setDeletePlan}){
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showPopup && !event.target.closest('.Plan-setting-popUp')) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    return(
        <div className="Plan-setting-popUp" id="planSettingPopup">
            <button className="setting-popUp-content" onClick={()=> navigate(`/editplan/${id}`)}>
                <FontAwesomeIcon icon={faPencil} size="lg" id="faPencil"/>
                <p>แก้ไขแพลนนี้</p>
            </button>
            <button className="setting-popUp-content" onClick={()=> setDeletePlan(true)}>
                <FontAwesomeIcon icon={faTrash} size="lg" id="faTrash"/>
                <p>ลบแพลนนี้</p>
            </button>
        </div>
    )
}

function DeletePopUp({ uid ,id, setDeletePlan }){
    const DeletePlan = async ()=>{
        console.log("DeletePlan : ", {id})
        try {
            await fetch(`http://localhost:3000/deletePlan?uid=${uid}&id=${id}`, {
                method: 'POST'
            }).then(
                window.location.reload()
            )
        } catch (error) {
            console.error("Error send post:", error);
            throw error;
        }
    }
    return(
        <div className="Delete-Pop-UP">
            <p>คุณต้องการลบแพลนนี้ใช่หรือไม่</p>
            <div>
                <button className="Delete-Yes" onClick={DeletePlan}>ใช่</button>
                <button className="Delete-No" onClick={()=> setDeletePlan(false)}>ไม่</button>
            </div>
        </div>
    )
}

export default Thumbnail;