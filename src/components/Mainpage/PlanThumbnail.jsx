import React, { useState, useEffect } from "react";
import '/src/global.css'
import './planthumbnail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

function Thumbnail(){
    return(<>
    <div className="PlanThumbnail">
        <div className="FilterArea">
            <div className="searchBox">
                <label htmlFor="search" id="searchLabel">
                    <input type="text" placeholder="ค้นหาแพลน" id="search" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{ color: 'var(--color-text)' }}/>
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

        <div className="Thumbnail-scroll">
            <div className="Thumbnail">
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
                < ThumbnailElement
                    Title ={"I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS?"}
                    StartDate ={"435 345 345"}
                    EndDate ={"234 235 2235"}
                    From = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                    To = {"nkfldvnzdlkvnzldknvdkldsvmz"}
                />
            </div>
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

function ThumbnailElement({Title, StartDate, EndDate, From, To}){
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

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
        <div className="ThumbnailElement">
            <div className="grid-Thumbnail">
                <div className="Thumbnail-content">
                    <h2>{Title}</h2>
                    <div className="Date">
                        <span>วันที่ </span><span>{StartDate}</span><span> - </span><span>{EndDate}</span>
                    </div>
                    <div className="Thumbnail-where"><span>จาก : </span><span>{From}</span></div>
                    <div className="Thumbnail-where"><span>ถึง : </span><span>{To}</span></div>
                </div>
                <div className="Plan-setting">
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" id="settingPlan-btn" onClick={togglePopup}/>
                    {showPopup && (
                        <div className="Plan-setting-popUp" id="planSettingPopup" onClick={closePopup}>
                            <div className="setting-popUp-content">
                                <FontAwesomeIcon icon={faPencil} size="lg" id="faPencil"/>
                                <p>แก้ไขแพลนนี้</p>
                            </div>
                            <div className="setting-popUp-content">
                                <FontAwesomeIcon icon={faTrash} size="lg" id="faTrash"/>
                                <p>ลบแพลนนี้</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="goToPlan">
                <input type="submit" id="seePlan" value="ดูแพลน" />
            </div>
        </div>
    )
}

export default Thumbnail;