import React, { useContext, useState, useEffect } from "react";
import '/src/global.css'
import './planthumbnail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

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
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </div>
            </div>
            <div className="goToPlan">
                <input type="submit" id="seePlan" value="ดูแพลน" />
            </div>
        </div>
    )
}

export default Thumbnail;