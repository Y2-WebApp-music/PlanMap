import React from 'react';
import '/src/global.css';
import './map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faStar, faStarHalf, faInfo } from '@fortawesome/free-solid-svg-icons'

export function NearbyList({placePin, placePhoto, pathway, setPathway, setListLength, ListLength, onSelectPlace}){
    const placeName = placePin?.name || "Unknown Place";
    const rating = placePin.rating || 0;
    const stars = [];
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;

    for (let i = 0; i < integerPart; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} size="sm" id="faStar"/>);
    }

    if (fractionalPart >= 0.25 && fractionalPart <= 0.75) {
    stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} size="sm" id="faStar"/>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty${i}`} icon={faStar} size="sm" id="faStar" style={{ color: 'transparent' }} />);
    }

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: placeName, lat: placePin.geometry.location.lat(), lng: placePin.geometry.location.lng(), place_id: placePin.place_id };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
    };

    return(<>
        <div className='placeList non-selectable'>
            <div className='img-contain'>
                <img src={placePhoto} alt="" className='Information-img' onMouseDown={(e)=>e.preventDefault()}/>
            </div>
            <div className='placeList-contain '>
                <div className='contain-headInfo'>
                    <p className='InformationName '>{placeName}</p>
                    <FontAwesomeIcon icon={faInfo} onClick={()=>onSelectPlace(placePin, placePhoto)} size="xl" id="faInfo"/>
                </div>
                <div className='placeList-Information'>
                    <span className='placeRate'>
                        {rating}
                        {stars}
                        <p className='placeList-placeType'>{placePin.user_ratings_total} คน มีส่วนร่วม</p>
                    </span>
                    <div className='placeList-AddPlaceInfo-contain'>
                        <button className='placeList-AddPlaceInfo' onClick={addPathDestination}>
                            <FontAwesomeIcon icon={faPlus} size="lg" id="faPlus"/>
                            <p>เพิ่มสถานที่นี้</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}